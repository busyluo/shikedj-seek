package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.BankTransfer;
import com.shikedj.com.seek.repository.BankTransferRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.shikedj.com.seek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BankTransferResource REST controller.
 *
 * @see BankTransferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class BankTransferResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    @Autowired
    private BankTransferRepository bankTransferRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankTransferMockMvc;

    private BankTransfer bankTransfer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankTransferResource bankTransferResource = new BankTransferResource(bankTransferRepository);
        this.restBankTransferMockMvc = MockMvcBuilders.standaloneSetup(bankTransferResource)
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
    public static BankTransfer createEntity(EntityManager em) {
        BankTransfer bankTransfer = new BankTransfer()
            .time(DEFAULT_TIME)
            .amount(DEFAULT_AMOUNT);
        return bankTransfer;
    }

    @Before
    public void initTest() {
        bankTransfer = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankTransfer() throws Exception {
        int databaseSizeBeforeCreate = bankTransferRepository.findAll().size();

        // Create the BankTransfer
        restBankTransferMockMvc.perform(post("/api/bank-transfers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankTransfer)))
            .andExpect(status().isCreated());

        // Validate the BankTransfer in the database
        List<BankTransfer> bankTransferList = bankTransferRepository.findAll();
        assertThat(bankTransferList).hasSize(databaseSizeBeforeCreate + 1);
        BankTransfer testBankTransfer = bankTransferList.get(bankTransferList.size() - 1);
        assertThat(testBankTransfer.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testBankTransfer.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createBankTransferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankTransferRepository.findAll().size();

        // Create the BankTransfer with an existing ID
        bankTransfer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankTransferMockMvc.perform(post("/api/bank-transfers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankTransfer)))
            .andExpect(status().isBadRequest());

        // Validate the BankTransfer in the database
        List<BankTransfer> bankTransferList = bankTransferRepository.findAll();
        assertThat(bankTransferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBankTransfers() throws Exception {
        // Initialize the database
        bankTransferRepository.saveAndFlush(bankTransfer);

        // Get all the bankTransferList
        restBankTransferMockMvc.perform(get("/api/bank-transfers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankTransfer.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getBankTransfer() throws Exception {
        // Initialize the database
        bankTransferRepository.saveAndFlush(bankTransfer);

        // Get the bankTransfer
        restBankTransferMockMvc.perform(get("/api/bank-transfers/{id}", bankTransfer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankTransfer.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBankTransfer() throws Exception {
        // Get the bankTransfer
        restBankTransferMockMvc.perform(get("/api/bank-transfers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankTransfer() throws Exception {
        // Initialize the database
        bankTransferRepository.saveAndFlush(bankTransfer);

        int databaseSizeBeforeUpdate = bankTransferRepository.findAll().size();

        // Update the bankTransfer
        BankTransfer updatedBankTransfer = bankTransferRepository.findById(bankTransfer.getId()).get();
        // Disconnect from session so that the updates on updatedBankTransfer are not directly saved in db
        em.detach(updatedBankTransfer);
        updatedBankTransfer
            .time(UPDATED_TIME)
            .amount(UPDATED_AMOUNT);

        restBankTransferMockMvc.perform(put("/api/bank-transfers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankTransfer)))
            .andExpect(status().isOk());

        // Validate the BankTransfer in the database
        List<BankTransfer> bankTransferList = bankTransferRepository.findAll();
        assertThat(bankTransferList).hasSize(databaseSizeBeforeUpdate);
        BankTransfer testBankTransfer = bankTransferList.get(bankTransferList.size() - 1);
        assertThat(testBankTransfer.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testBankTransfer.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingBankTransfer() throws Exception {
        int databaseSizeBeforeUpdate = bankTransferRepository.findAll().size();

        // Create the BankTransfer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankTransferMockMvc.perform(put("/api/bank-transfers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankTransfer)))
            .andExpect(status().isBadRequest());

        // Validate the BankTransfer in the database
        List<BankTransfer> bankTransferList = bankTransferRepository.findAll();
        assertThat(bankTransferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBankTransfer() throws Exception {
        // Initialize the database
        bankTransferRepository.saveAndFlush(bankTransfer);

        int databaseSizeBeforeDelete = bankTransferRepository.findAll().size();

        // Get the bankTransfer
        restBankTransferMockMvc.perform(delete("/api/bank-transfers/{id}", bankTransfer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BankTransfer> bankTransferList = bankTransferRepository.findAll();
        assertThat(bankTransferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankTransfer.class);
        BankTransfer bankTransfer1 = new BankTransfer();
        bankTransfer1.setId(1L);
        BankTransfer bankTransfer2 = new BankTransfer();
        bankTransfer2.setId(bankTransfer1.getId());
        assertThat(bankTransfer1).isEqualTo(bankTransfer2);
        bankTransfer2.setId(2L);
        assertThat(bankTransfer1).isNotEqualTo(bankTransfer2);
        bankTransfer1.setId(null);
        assertThat(bankTransfer1).isNotEqualTo(bankTransfer2);
    }
}
