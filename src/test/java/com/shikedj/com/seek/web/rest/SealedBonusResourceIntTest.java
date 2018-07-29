package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.SealedBonus;
import com.shikedj.com.seek.repository.SealedBonusRepository;
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
 * Test class for the SealedBonusResource REST controller.
 *
 * @see SealedBonusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class SealedBonusResourceIntTest {

    private static final Integer DEFAULT_PROGRESS = 1;
    private static final Integer UPDATED_PROGRESS = 2;

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    @Autowired
    private SealedBonusRepository sealedBonusRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSealedBonusMockMvc;

    private SealedBonus sealedBonus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SealedBonusResource sealedBonusResource = new SealedBonusResource(sealedBonusRepository);
        this.restSealedBonusMockMvc = MockMvcBuilders.standaloneSetup(sealedBonusResource)
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
    public static SealedBonus createEntity(EntityManager em) {
        SealedBonus sealedBonus = new SealedBonus()
            .progress(DEFAULT_PROGRESS)
            .amount(DEFAULT_AMOUNT);
        return sealedBonus;
    }

    @Before
    public void initTest() {
        sealedBonus = createEntity(em);
    }

    @Test
    @Transactional
    public void createSealedBonus() throws Exception {
        int databaseSizeBeforeCreate = sealedBonusRepository.findAll().size();

        // Create the SealedBonus
        restSealedBonusMockMvc.perform(post("/api/sealed-bonuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sealedBonus)))
            .andExpect(status().isCreated());

        // Validate the SealedBonus in the database
        List<SealedBonus> sealedBonusList = sealedBonusRepository.findAll();
        assertThat(sealedBonusList).hasSize(databaseSizeBeforeCreate + 1);
        SealedBonus testSealedBonus = sealedBonusList.get(sealedBonusList.size() - 1);
        assertThat(testSealedBonus.getProgress()).isEqualTo(DEFAULT_PROGRESS);
        assertThat(testSealedBonus.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createSealedBonusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sealedBonusRepository.findAll().size();

        // Create the SealedBonus with an existing ID
        sealedBonus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSealedBonusMockMvc.perform(post("/api/sealed-bonuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sealedBonus)))
            .andExpect(status().isBadRequest());

        // Validate the SealedBonus in the database
        List<SealedBonus> sealedBonusList = sealedBonusRepository.findAll();
        assertThat(sealedBonusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSealedBonuses() throws Exception {
        // Initialize the database
        sealedBonusRepository.saveAndFlush(sealedBonus);

        // Get all the sealedBonusList
        restSealedBonusMockMvc.perform(get("/api/sealed-bonuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sealedBonus.getId().intValue())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getSealedBonus() throws Exception {
        // Initialize the database
        sealedBonusRepository.saveAndFlush(sealedBonus);

        // Get the sealedBonus
        restSealedBonusMockMvc.perform(get("/api/sealed-bonuses/{id}", sealedBonus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sealedBonus.getId().intValue()))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSealedBonus() throws Exception {
        // Get the sealedBonus
        restSealedBonusMockMvc.perform(get("/api/sealed-bonuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSealedBonus() throws Exception {
        // Initialize the database
        sealedBonusRepository.saveAndFlush(sealedBonus);

        int databaseSizeBeforeUpdate = sealedBonusRepository.findAll().size();

        // Update the sealedBonus
        SealedBonus updatedSealedBonus = sealedBonusRepository.findById(sealedBonus.getId()).get();
        // Disconnect from session so that the updates on updatedSealedBonus are not directly saved in db
        em.detach(updatedSealedBonus);
        updatedSealedBonus
            .progress(UPDATED_PROGRESS)
            .amount(UPDATED_AMOUNT);

        restSealedBonusMockMvc.perform(put("/api/sealed-bonuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSealedBonus)))
            .andExpect(status().isOk());

        // Validate the SealedBonus in the database
        List<SealedBonus> sealedBonusList = sealedBonusRepository.findAll();
        assertThat(sealedBonusList).hasSize(databaseSizeBeforeUpdate);
        SealedBonus testSealedBonus = sealedBonusList.get(sealedBonusList.size() - 1);
        assertThat(testSealedBonus.getProgress()).isEqualTo(UPDATED_PROGRESS);
        assertThat(testSealedBonus.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingSealedBonus() throws Exception {
        int databaseSizeBeforeUpdate = sealedBonusRepository.findAll().size();

        // Create the SealedBonus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSealedBonusMockMvc.perform(put("/api/sealed-bonuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sealedBonus)))
            .andExpect(status().isBadRequest());

        // Validate the SealedBonus in the database
        List<SealedBonus> sealedBonusList = sealedBonusRepository.findAll();
        assertThat(sealedBonusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSealedBonus() throws Exception {
        // Initialize the database
        sealedBonusRepository.saveAndFlush(sealedBonus);

        int databaseSizeBeforeDelete = sealedBonusRepository.findAll().size();

        // Get the sealedBonus
        restSealedBonusMockMvc.perform(delete("/api/sealed-bonuses/{id}", sealedBonus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SealedBonus> sealedBonusList = sealedBonusRepository.findAll();
        assertThat(sealedBonusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SealedBonus.class);
        SealedBonus sealedBonus1 = new SealedBonus();
        sealedBonus1.setId(1L);
        SealedBonus sealedBonus2 = new SealedBonus();
        sealedBonus2.setId(sealedBonus1.getId());
        assertThat(sealedBonus1).isEqualTo(sealedBonus2);
        sealedBonus2.setId(2L);
        assertThat(sealedBonus1).isNotEqualTo(sealedBonus2);
        sealedBonus1.setId(null);
        assertThat(sealedBonus1).isNotEqualTo(sealedBonus2);
    }
}
