package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.AgentAdmin;
import com.shikedj.com.seek.repository.AgentAdminRepository;
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
 * Test class for the AgentAdminResource REST controller.
 *
 * @see AgentAdminResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class AgentAdminResourceIntTest {

    @Autowired
    private AgentAdminRepository agentAdminRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgentAdminMockMvc;

    private AgentAdmin agentAdmin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentAdminResource agentAdminResource = new AgentAdminResource(agentAdminRepository);
        this.restAgentAdminMockMvc = MockMvcBuilders.standaloneSetup(agentAdminResource)
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
    public static AgentAdmin createEntity(EntityManager em) {
        AgentAdmin agentAdmin = new AgentAdmin();
        return agentAdmin;
    }

    @Before
    public void initTest() {
        agentAdmin = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgentAdmin() throws Exception {
        int databaseSizeBeforeCreate = agentAdminRepository.findAll().size();

        // Create the AgentAdmin
        restAgentAdminMockMvc.perform(post("/api/agent-admins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentAdmin)))
            .andExpect(status().isCreated());

        // Validate the AgentAdmin in the database
        List<AgentAdmin> agentAdminList = agentAdminRepository.findAll();
        assertThat(agentAdminList).hasSize(databaseSizeBeforeCreate + 1);
        AgentAdmin testAgentAdmin = agentAdminList.get(agentAdminList.size() - 1);
    }

    @Test
    @Transactional
    public void createAgentAdminWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentAdminRepository.findAll().size();

        // Create the AgentAdmin with an existing ID
        agentAdmin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentAdminMockMvc.perform(post("/api/agent-admins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the AgentAdmin in the database
        List<AgentAdmin> agentAdminList = agentAdminRepository.findAll();
        assertThat(agentAdminList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgentAdmins() throws Exception {
        // Initialize the database
        agentAdminRepository.saveAndFlush(agentAdmin);

        // Get all the agentAdminList
        restAgentAdminMockMvc.perform(get("/api/agent-admins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agentAdmin.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getAgentAdmin() throws Exception {
        // Initialize the database
        agentAdminRepository.saveAndFlush(agentAdmin);

        // Get the agentAdmin
        restAgentAdminMockMvc.perform(get("/api/agent-admins/{id}", agentAdmin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agentAdmin.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAgentAdmin() throws Exception {
        // Get the agentAdmin
        restAgentAdminMockMvc.perform(get("/api/agent-admins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgentAdmin() throws Exception {
        // Initialize the database
        agentAdminRepository.saveAndFlush(agentAdmin);

        int databaseSizeBeforeUpdate = agentAdminRepository.findAll().size();

        // Update the agentAdmin
        AgentAdmin updatedAgentAdmin = agentAdminRepository.findById(agentAdmin.getId()).get();
        // Disconnect from session so that the updates on updatedAgentAdmin are not directly saved in db
        em.detach(updatedAgentAdmin);

        restAgentAdminMockMvc.perform(put("/api/agent-admins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgentAdmin)))
            .andExpect(status().isOk());

        // Validate the AgentAdmin in the database
        List<AgentAdmin> agentAdminList = agentAdminRepository.findAll();
        assertThat(agentAdminList).hasSize(databaseSizeBeforeUpdate);
        AgentAdmin testAgentAdmin = agentAdminList.get(agentAdminList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAgentAdmin() throws Exception {
        int databaseSizeBeforeUpdate = agentAdminRepository.findAll().size();

        // Create the AgentAdmin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgentAdminMockMvc.perform(put("/api/agent-admins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the AgentAdmin in the database
        List<AgentAdmin> agentAdminList = agentAdminRepository.findAll();
        assertThat(agentAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgentAdmin() throws Exception {
        // Initialize the database
        agentAdminRepository.saveAndFlush(agentAdmin);

        int databaseSizeBeforeDelete = agentAdminRepository.findAll().size();

        // Get the agentAdmin
        restAgentAdminMockMvc.perform(delete("/api/agent-admins/{id}", agentAdmin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgentAdmin> agentAdminList = agentAdminRepository.findAll();
        assertThat(agentAdminList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgentAdmin.class);
        AgentAdmin agentAdmin1 = new AgentAdmin();
        agentAdmin1.setId(1L);
        AgentAdmin agentAdmin2 = new AgentAdmin();
        agentAdmin2.setId(agentAdmin1.getId());
        assertThat(agentAdmin1).isEqualTo(agentAdmin2);
        agentAdmin2.setId(2L);
        assertThat(agentAdmin1).isNotEqualTo(agentAdmin2);
        agentAdmin1.setId(null);
        assertThat(agentAdmin1).isNotEqualTo(agentAdmin2);
    }
}
