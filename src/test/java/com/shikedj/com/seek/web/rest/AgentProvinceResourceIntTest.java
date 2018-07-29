package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.AgentProvince;
import com.shikedj.com.seek.repository.AgentProvinceRepository;
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
 * Test class for the AgentProvinceResource REST controller.
 *
 * @see AgentProvinceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class AgentProvinceResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AgentProvinceRepository agentProvinceRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgentProvinceMockMvc;

    private AgentProvince agentProvince;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentProvinceResource agentProvinceResource = new AgentProvinceResource(agentProvinceRepository);
        this.restAgentProvinceMockMvc = MockMvcBuilders.standaloneSetup(agentProvinceResource)
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
    public static AgentProvince createEntity(EntityManager em) {
        AgentProvince agentProvince = new AgentProvince()
            .name(DEFAULT_NAME);
        return agentProvince;
    }

    @Before
    public void initTest() {
        agentProvince = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgentProvince() throws Exception {
        int databaseSizeBeforeCreate = agentProvinceRepository.findAll().size();

        // Create the AgentProvince
        restAgentProvinceMockMvc.perform(post("/api/agent-provinces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentProvince)))
            .andExpect(status().isCreated());

        // Validate the AgentProvince in the database
        List<AgentProvince> agentProvinceList = agentProvinceRepository.findAll();
        assertThat(agentProvinceList).hasSize(databaseSizeBeforeCreate + 1);
        AgentProvince testAgentProvince = agentProvinceList.get(agentProvinceList.size() - 1);
        assertThat(testAgentProvince.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAgentProvinceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentProvinceRepository.findAll().size();

        // Create the AgentProvince with an existing ID
        agentProvince.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentProvinceMockMvc.perform(post("/api/agent-provinces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentProvince)))
            .andExpect(status().isBadRequest());

        // Validate the AgentProvince in the database
        List<AgentProvince> agentProvinceList = agentProvinceRepository.findAll();
        assertThat(agentProvinceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgentProvinces() throws Exception {
        // Initialize the database
        agentProvinceRepository.saveAndFlush(agentProvince);

        // Get all the agentProvinceList
        restAgentProvinceMockMvc.perform(get("/api/agent-provinces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agentProvince.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getAgentProvince() throws Exception {
        // Initialize the database
        agentProvinceRepository.saveAndFlush(agentProvince);

        // Get the agentProvince
        restAgentProvinceMockMvc.perform(get("/api/agent-provinces/{id}", agentProvince.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agentProvince.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgentProvince() throws Exception {
        // Get the agentProvince
        restAgentProvinceMockMvc.perform(get("/api/agent-provinces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgentProvince() throws Exception {
        // Initialize the database
        agentProvinceRepository.saveAndFlush(agentProvince);

        int databaseSizeBeforeUpdate = agentProvinceRepository.findAll().size();

        // Update the agentProvince
        AgentProvince updatedAgentProvince = agentProvinceRepository.findById(agentProvince.getId()).get();
        // Disconnect from session so that the updates on updatedAgentProvince are not directly saved in db
        em.detach(updatedAgentProvince);
        updatedAgentProvince
            .name(UPDATED_NAME);

        restAgentProvinceMockMvc.perform(put("/api/agent-provinces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgentProvince)))
            .andExpect(status().isOk());

        // Validate the AgentProvince in the database
        List<AgentProvince> agentProvinceList = agentProvinceRepository.findAll();
        assertThat(agentProvinceList).hasSize(databaseSizeBeforeUpdate);
        AgentProvince testAgentProvince = agentProvinceList.get(agentProvinceList.size() - 1);
        assertThat(testAgentProvince.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAgentProvince() throws Exception {
        int databaseSizeBeforeUpdate = agentProvinceRepository.findAll().size();

        // Create the AgentProvince

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgentProvinceMockMvc.perform(put("/api/agent-provinces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentProvince)))
            .andExpect(status().isBadRequest());

        // Validate the AgentProvince in the database
        List<AgentProvince> agentProvinceList = agentProvinceRepository.findAll();
        assertThat(agentProvinceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgentProvince() throws Exception {
        // Initialize the database
        agentProvinceRepository.saveAndFlush(agentProvince);

        int databaseSizeBeforeDelete = agentProvinceRepository.findAll().size();

        // Get the agentProvince
        restAgentProvinceMockMvc.perform(delete("/api/agent-provinces/{id}", agentProvince.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgentProvince> agentProvinceList = agentProvinceRepository.findAll();
        assertThat(agentProvinceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgentProvince.class);
        AgentProvince agentProvince1 = new AgentProvince();
        agentProvince1.setId(1L);
        AgentProvince agentProvince2 = new AgentProvince();
        agentProvince2.setId(agentProvince1.getId());
        assertThat(agentProvince1).isEqualTo(agentProvince2);
        agentProvince2.setId(2L);
        assertThat(agentProvince1).isNotEqualTo(agentProvince2);
        agentProvince1.setId(null);
        assertThat(agentProvince1).isNotEqualTo(agentProvince2);
    }
}
