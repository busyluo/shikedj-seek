package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.RestaurantType;
import com.shikedj.com.seek.repository.RestaurantTypeRepository;
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
 * Test class for the RestaurantTypeResource REST controller.
 *
 * @see RestaurantTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class RestaurantTypeResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private RestaurantTypeRepository restaurantTypeRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestaurantTypeMockMvc;

    private RestaurantType restaurantType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestaurantTypeResource restaurantTypeResource = new RestaurantTypeResource(restaurantTypeRepository);
        this.restRestaurantTypeMockMvc = MockMvcBuilders.standaloneSetup(restaurantTypeResource)
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
    public static RestaurantType createEntity(EntityManager em) {
        RestaurantType restaurantType = new RestaurantType()
            .type(DEFAULT_TYPE);
        return restaurantType;
    }

    @Before
    public void initTest() {
        restaurantType = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurantType() throws Exception {
        int databaseSizeBeforeCreate = restaurantTypeRepository.findAll().size();

        // Create the RestaurantType
        restRestaurantTypeMockMvc.perform(post("/api/restaurant-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantType)))
            .andExpect(status().isCreated());

        // Validate the RestaurantType in the database
        List<RestaurantType> restaurantTypeList = restaurantTypeRepository.findAll();
        assertThat(restaurantTypeList).hasSize(databaseSizeBeforeCreate + 1);
        RestaurantType testRestaurantType = restaurantTypeList.get(restaurantTypeList.size() - 1);
        assertThat(testRestaurantType.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createRestaurantTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restaurantTypeRepository.findAll().size();

        // Create the RestaurantType with an existing ID
        restaurantType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantTypeMockMvc.perform(post("/api/restaurant-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantType)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantType in the database
        List<RestaurantType> restaurantTypeList = restaurantTypeRepository.findAll();
        assertThat(restaurantTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRestaurantTypes() throws Exception {
        // Initialize the database
        restaurantTypeRepository.saveAndFlush(restaurantType);

        // Get all the restaurantTypeList
        restRestaurantTypeMockMvc.perform(get("/api/restaurant-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurantType.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getRestaurantType() throws Exception {
        // Initialize the database
        restaurantTypeRepository.saveAndFlush(restaurantType);

        // Get the restaurantType
        restRestaurantTypeMockMvc.perform(get("/api/restaurant-types/{id}", restaurantType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restaurantType.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRestaurantType() throws Exception {
        // Get the restaurantType
        restRestaurantTypeMockMvc.perform(get("/api/restaurant-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurantType() throws Exception {
        // Initialize the database
        restaurantTypeRepository.saveAndFlush(restaurantType);

        int databaseSizeBeforeUpdate = restaurantTypeRepository.findAll().size();

        // Update the restaurantType
        RestaurantType updatedRestaurantType = restaurantTypeRepository.findById(restaurantType.getId()).get();
        // Disconnect from session so that the updates on updatedRestaurantType are not directly saved in db
        em.detach(updatedRestaurantType);
        updatedRestaurantType
            .type(UPDATED_TYPE);

        restRestaurantTypeMockMvc.perform(put("/api/restaurant-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestaurantType)))
            .andExpect(status().isOk());

        // Validate the RestaurantType in the database
        List<RestaurantType> restaurantTypeList = restaurantTypeRepository.findAll();
        assertThat(restaurantTypeList).hasSize(databaseSizeBeforeUpdate);
        RestaurantType testRestaurantType = restaurantTypeList.get(restaurantTypeList.size() - 1);
        assertThat(testRestaurantType.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurantType() throws Exception {
        int databaseSizeBeforeUpdate = restaurantTypeRepository.findAll().size();

        // Create the RestaurantType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestaurantTypeMockMvc.perform(put("/api/restaurant-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurantType)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantType in the database
        List<RestaurantType> restaurantTypeList = restaurantTypeRepository.findAll();
        assertThat(restaurantTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestaurantType() throws Exception {
        // Initialize the database
        restaurantTypeRepository.saveAndFlush(restaurantType);

        int databaseSizeBeforeDelete = restaurantTypeRepository.findAll().size();

        // Get the restaurantType
        restRestaurantTypeMockMvc.perform(delete("/api/restaurant-types/{id}", restaurantType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RestaurantType> restaurantTypeList = restaurantTypeRepository.findAll();
        assertThat(restaurantTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantType.class);
        RestaurantType restaurantType1 = new RestaurantType();
        restaurantType1.setId(1L);
        RestaurantType restaurantType2 = new RestaurantType();
        restaurantType2.setId(restaurantType1.getId());
        assertThat(restaurantType1).isEqualTo(restaurantType2);
        restaurantType2.setId(2L);
        assertThat(restaurantType1).isNotEqualTo(restaurantType2);
        restaurantType1.setId(null);
        assertThat(restaurantType1).isNotEqualTo(restaurantType2);
    }
}
