package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.MealTable;
import com.shikedj.com.seek.repository.MealTableRepository;
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

import com.shikedj.com.seek.domain.enumeration.TableType;
import com.shikedj.com.seek.domain.enumeration.TableStatus;
/**
 * Test class for the MealTableResource REST controller.
 *
 * @see MealTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class MealTableResourceIntTest {

    private static final TableType DEFAULT_TYPE = TableType.SMALL;
    private static final TableType UPDATED_TYPE = TableType.MEDIUM;

    private static final TableStatus DEFAULT_STATUS = TableStatus.SPARE;
    private static final TableStatus UPDATED_STATUS = TableStatus.OCCUPIED;

    @Autowired
    private MealTableRepository mealTableRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMealTableMockMvc;

    private MealTable mealTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealTableResource mealTableResource = new MealTableResource(mealTableRepository);
        this.restMealTableMockMvc = MockMvcBuilders.standaloneSetup(mealTableResource)
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
    public static MealTable createEntity(EntityManager em) {
        MealTable mealTable = new MealTable()
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS);
        return mealTable;
    }

    @Before
    public void initTest() {
        mealTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealTable() throws Exception {
        int databaseSizeBeforeCreate = mealTableRepository.findAll().size();

        // Create the MealTable
        restMealTableMockMvc.perform(post("/api/meal-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTable)))
            .andExpect(status().isCreated());

        // Validate the MealTable in the database
        List<MealTable> mealTableList = mealTableRepository.findAll();
        assertThat(mealTableList).hasSize(databaseSizeBeforeCreate + 1);
        MealTable testMealTable = mealTableList.get(mealTableList.size() - 1);
        assertThat(testMealTable.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMealTable.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createMealTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealTableRepository.findAll().size();

        // Create the MealTable with an existing ID
        mealTable.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealTableMockMvc.perform(post("/api/meal-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTable)))
            .andExpect(status().isBadRequest());

        // Validate the MealTable in the database
        List<MealTable> mealTableList = mealTableRepository.findAll();
        assertThat(mealTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMealTables() throws Exception {
        // Initialize the database
        mealTableRepository.saveAndFlush(mealTable);

        // Get all the mealTableList
        restMealTableMockMvc.perform(get("/api/meal-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getMealTable() throws Exception {
        // Initialize the database
        mealTableRepository.saveAndFlush(mealTable);

        // Get the mealTable
        restMealTableMockMvc.perform(get("/api/meal-tables/{id}", mealTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealTable.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMealTable() throws Exception {
        // Get the mealTable
        restMealTableMockMvc.perform(get("/api/meal-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealTable() throws Exception {
        // Initialize the database
        mealTableRepository.saveAndFlush(mealTable);

        int databaseSizeBeforeUpdate = mealTableRepository.findAll().size();

        // Update the mealTable
        MealTable updatedMealTable = mealTableRepository.findById(mealTable.getId()).get();
        // Disconnect from session so that the updates on updatedMealTable are not directly saved in db
        em.detach(updatedMealTable);
        updatedMealTable
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);

        restMealTableMockMvc.perform(put("/api/meal-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealTable)))
            .andExpect(status().isOk());

        // Validate the MealTable in the database
        List<MealTable> mealTableList = mealTableRepository.findAll();
        assertThat(mealTableList).hasSize(databaseSizeBeforeUpdate);
        MealTable testMealTable = mealTableList.get(mealTableList.size() - 1);
        assertThat(testMealTable.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMealTable.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingMealTable() throws Exception {
        int databaseSizeBeforeUpdate = mealTableRepository.findAll().size();

        // Create the MealTable

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMealTableMockMvc.perform(put("/api/meal-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealTable)))
            .andExpect(status().isBadRequest());

        // Validate the MealTable in the database
        List<MealTable> mealTableList = mealTableRepository.findAll();
        assertThat(mealTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealTable() throws Exception {
        // Initialize the database
        mealTableRepository.saveAndFlush(mealTable);

        int databaseSizeBeforeDelete = mealTableRepository.findAll().size();

        // Get the mealTable
        restMealTableMockMvc.perform(delete("/api/meal-tables/{id}", mealTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealTable> mealTableList = mealTableRepository.findAll();
        assertThat(mealTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealTable.class);
        MealTable mealTable1 = new MealTable();
        mealTable1.setId(1L);
        MealTable mealTable2 = new MealTable();
        mealTable2.setId(mealTable1.getId());
        assertThat(mealTable1).isEqualTo(mealTable2);
        mealTable2.setId(2L);
        assertThat(mealTable1).isNotEqualTo(mealTable2);
        mealTable1.setId(null);
        assertThat(mealTable1).isNotEqualTo(mealTable2);
    }
}
