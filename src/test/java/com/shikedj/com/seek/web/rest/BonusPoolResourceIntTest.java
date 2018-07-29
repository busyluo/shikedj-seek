package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.BonusPool;
import com.shikedj.com.seek.repository.BonusPoolRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.shikedj.com.seek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BonusPoolResource REST controller.
 *
 * @see BonusPoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class BonusPoolResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_USED = 1D;
    private static final Double UPDATED_USED = 2D;

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    @Autowired
    private BonusPoolRepository bonusPoolRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBonusPoolMockMvc;

    private BonusPool bonusPool;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BonusPoolResource bonusPoolResource = new BonusPoolResource(bonusPoolRepository);
        this.restBonusPoolMockMvc = MockMvcBuilders.standaloneSetup(bonusPoolResource)
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
    public static BonusPool createEntity(EntityManager em) {
        BonusPool bonusPool = new BonusPool()
            .date(DEFAULT_DATE)
            .used(DEFAULT_USED)
            .total(DEFAULT_TOTAL);
        return bonusPool;
    }

    @Before
    public void initTest() {
        bonusPool = createEntity(em);
    }

    @Test
    @Transactional
    public void createBonusPool() throws Exception {
        int databaseSizeBeforeCreate = bonusPoolRepository.findAll().size();

        // Create the BonusPool
        restBonusPoolMockMvc.perform(post("/api/bonus-pools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bonusPool)))
            .andExpect(status().isCreated());

        // Validate the BonusPool in the database
        List<BonusPool> bonusPoolList = bonusPoolRepository.findAll();
        assertThat(bonusPoolList).hasSize(databaseSizeBeforeCreate + 1);
        BonusPool testBonusPool = bonusPoolList.get(bonusPoolList.size() - 1);
        assertThat(testBonusPool.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testBonusPool.getUsed()).isEqualTo(DEFAULT_USED);
        assertThat(testBonusPool.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createBonusPoolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bonusPoolRepository.findAll().size();

        // Create the BonusPool with an existing ID
        bonusPool.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBonusPoolMockMvc.perform(post("/api/bonus-pools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bonusPool)))
            .andExpect(status().isBadRequest());

        // Validate the BonusPool in the database
        List<BonusPool> bonusPoolList = bonusPoolRepository.findAll();
        assertThat(bonusPoolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBonusPools() throws Exception {
        // Initialize the database
        bonusPoolRepository.saveAndFlush(bonusPool);

        // Get all the bonusPoolList
        restBonusPoolMockMvc.perform(get("/api/bonus-pools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonusPool.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].used").value(hasItem(DEFAULT_USED.doubleValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getBonusPool() throws Exception {
        // Initialize the database
        bonusPoolRepository.saveAndFlush(bonusPool);

        // Get the bonusPool
        restBonusPoolMockMvc.perform(get("/api/bonus-pools/{id}", bonusPool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bonusPool.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.used").value(DEFAULT_USED.doubleValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBonusPool() throws Exception {
        // Get the bonusPool
        restBonusPoolMockMvc.perform(get("/api/bonus-pools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBonusPool() throws Exception {
        // Initialize the database
        bonusPoolRepository.saveAndFlush(bonusPool);

        int databaseSizeBeforeUpdate = bonusPoolRepository.findAll().size();

        // Update the bonusPool
        BonusPool updatedBonusPool = bonusPoolRepository.findById(bonusPool.getId()).get();
        // Disconnect from session so that the updates on updatedBonusPool are not directly saved in db
        em.detach(updatedBonusPool);
        updatedBonusPool
            .date(UPDATED_DATE)
            .used(UPDATED_USED)
            .total(UPDATED_TOTAL);

        restBonusPoolMockMvc.perform(put("/api/bonus-pools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBonusPool)))
            .andExpect(status().isOk());

        // Validate the BonusPool in the database
        List<BonusPool> bonusPoolList = bonusPoolRepository.findAll();
        assertThat(bonusPoolList).hasSize(databaseSizeBeforeUpdate);
        BonusPool testBonusPool = bonusPoolList.get(bonusPoolList.size() - 1);
        assertThat(testBonusPool.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testBonusPool.getUsed()).isEqualTo(UPDATED_USED);
        assertThat(testBonusPool.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingBonusPool() throws Exception {
        int databaseSizeBeforeUpdate = bonusPoolRepository.findAll().size();

        // Create the BonusPool

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBonusPoolMockMvc.perform(put("/api/bonus-pools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bonusPool)))
            .andExpect(status().isBadRequest());

        // Validate the BonusPool in the database
        List<BonusPool> bonusPoolList = bonusPoolRepository.findAll();
        assertThat(bonusPoolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBonusPool() throws Exception {
        // Initialize the database
        bonusPoolRepository.saveAndFlush(bonusPool);

        int databaseSizeBeforeDelete = bonusPoolRepository.findAll().size();

        // Get the bonusPool
        restBonusPoolMockMvc.perform(delete("/api/bonus-pools/{id}", bonusPool.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BonusPool> bonusPoolList = bonusPoolRepository.findAll();
        assertThat(bonusPoolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BonusPool.class);
        BonusPool bonusPool1 = new BonusPool();
        bonusPool1.setId(1L);
        BonusPool bonusPool2 = new BonusPool();
        bonusPool2.setId(bonusPool1.getId());
        assertThat(bonusPool1).isEqualTo(bonusPool2);
        bonusPool2.setId(2L);
        assertThat(bonusPool1).isNotEqualTo(bonusPool2);
        bonusPool1.setId(null);
        assertThat(bonusPool1).isNotEqualTo(bonusPool2);
    }
}
