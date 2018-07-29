package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.MealOrderItem;
import com.shikedj.com.seek.repository.MealOrderItemRepository;
import com.shikedj.com.seek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.shikedj.com.seek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MealOrderItemResource REST controller.
 *
 * @see MealOrderItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class MealOrderItemResourceIntTest {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    @Autowired
    private MealOrderItemRepository mealOrderItemRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMealOrderItemMockMvc;

    private MealOrderItem mealOrderItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealOrderItemResource mealOrderItemResource = new MealOrderItemResource(mealOrderItemRepository);
        this.restMealOrderItemMockMvc = MockMvcBuilders.standaloneSetup(mealOrderItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealOrderItem createEntity(EntityManager em) {
        MealOrderItem mealOrderItem = new MealOrderItem()
            .amount(DEFAULT_AMOUNT);
        return mealOrderItem;
    }

    @Before
    public void initTest() {
        mealOrderItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealOrderItem() throws Exception {
        int databaseSizeBeforeCreate = mealOrderItemRepository.findAll().size();

        // Create the MealOrderItem
        restMealOrderItemMockMvc.perform(post("/api/meal-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrderItem)))
            .andExpect(status().isCreated());

        // Validate the MealOrderItem in the database
        List<MealOrderItem> mealOrderItemList = mealOrderItemRepository.findAll();
        assertThat(mealOrderItemList).hasSize(databaseSizeBeforeCreate + 1);
        MealOrderItem testMealOrderItem = mealOrderItemList.get(mealOrderItemList.size() - 1);
        assertThat(testMealOrderItem.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createMealOrderItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealOrderItemRepository.findAll().size();

        // Create the MealOrderItem with an existing ID
        mealOrderItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealOrderItemMockMvc.perform(post("/api/meal-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrderItem)))
            .andExpect(status().isBadRequest());

        // Validate the MealOrderItem in the database
        List<MealOrderItem> mealOrderItemList = mealOrderItemRepository.findAll();
        assertThat(mealOrderItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMealOrderItems() throws Exception {
        // Initialize the database
        mealOrderItemRepository.saveAndFlush(mealOrderItem);

        // Get all the mealOrderItemList
        restMealOrderItemMockMvc.perform(get("/api/meal-order-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealOrderItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }
    

    @Test
    @Transactional
    public void getMealOrderItem() throws Exception {
        // Initialize the database
        mealOrderItemRepository.saveAndFlush(mealOrderItem);

        // Get the mealOrderItem
        restMealOrderItemMockMvc.perform(get("/api/meal-order-items/{id}", mealOrderItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealOrderItem.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }
    @Test
    @Transactional
    public void getNonExistingMealOrderItem() throws Exception {
        // Get the mealOrderItem
        restMealOrderItemMockMvc.perform(get("/api/meal-order-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealOrderItem() throws Exception {
        // Initialize the database
        mealOrderItemRepository.saveAndFlush(mealOrderItem);

        int databaseSizeBeforeUpdate = mealOrderItemRepository.findAll().size();

        // Update the mealOrderItem
        MealOrderItem updatedMealOrderItem = mealOrderItemRepository.findById(mealOrderItem.getId()).get();
        // Disconnect from session so that the updates on updatedMealOrderItem are not directly saved in db
        em.detach(updatedMealOrderItem);
        updatedMealOrderItem
            .amount(UPDATED_AMOUNT);

        restMealOrderItemMockMvc.perform(put("/api/meal-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealOrderItem)))
            .andExpect(status().isOk());

        // Validate the MealOrderItem in the database
        List<MealOrderItem> mealOrderItemList = mealOrderItemRepository.findAll();
        assertThat(mealOrderItemList).hasSize(databaseSizeBeforeUpdate);
        MealOrderItem testMealOrderItem = mealOrderItemList.get(mealOrderItemList.size() - 1);
        assertThat(testMealOrderItem.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingMealOrderItem() throws Exception {
        int databaseSizeBeforeUpdate = mealOrderItemRepository.findAll().size();

        // Create the MealOrderItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMealOrderItemMockMvc.perform(put("/api/meal-order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrderItem)))
            .andExpect(status().isBadRequest());

        // Validate the MealOrderItem in the database
        List<MealOrderItem> mealOrderItemList = mealOrderItemRepository.findAll();
        assertThat(mealOrderItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealOrderItem() throws Exception {
        // Initialize the database
        mealOrderItemRepository.saveAndFlush(mealOrderItem);

        int databaseSizeBeforeDelete = mealOrderItemRepository.findAll().size();

        // Get the mealOrderItem
        restMealOrderItemMockMvc.perform(delete("/api/meal-order-items/{id}", mealOrderItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealOrderItem> mealOrderItemList = mealOrderItemRepository.findAll();
        assertThat(mealOrderItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealOrderItem.class);
        MealOrderItem mealOrderItem1 = new MealOrderItem();
        mealOrderItem1.setId(1L);
        MealOrderItem mealOrderItem2 = new MealOrderItem();
        mealOrderItem2.setId(mealOrderItem1.getId());
        assertThat(mealOrderItem1).isEqualTo(mealOrderItem2);
        mealOrderItem2.setId(2L);
        assertThat(mealOrderItem1).isNotEqualTo(mealOrderItem2);
        mealOrderItem1.setId(null);
        assertThat(mealOrderItem1).isNotEqualTo(mealOrderItem2);
    }
}
