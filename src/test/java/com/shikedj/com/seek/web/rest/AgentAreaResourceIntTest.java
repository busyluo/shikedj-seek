package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.AgentArea;
import com.shikedj.com.seek.repository.AgentAreaRepository;
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
 * Test class for the AgentAreaResource REST controller.
 *
 * @see AgentAreaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class AgentAreaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private AgentAreaRepository agentAreaRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgentAreaMockMvc;

    private AgentArea agentArea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentAreaResource agentAreaResource = new AgentAreaResource(agentAreaRepository);
        this.restAgentAreaMockMvc = MockMvcBuilders.standaloneSetup(agentAreaResource)
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
    public static AgentArea createEntity(EntityManager em) {
        AgentArea agentArea = new AgentArea()
            .name(DEFAULT_NAME);
        return agentArea;
    }

    @Before
    public void initTest() {
        agentArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgentArea() throws Exception {
        int databaseSizeBeforeCreate = agentAreaRepository.findAll().size();

        // Create the AgentArea
        restAgentAreaMockMvc.perform(post("/api/agent-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentArea)))
            .andExpect(status().isCreated());

        // Validate the AgentArea in the database
        List<AgentArea> agentAreaList = agentAreaRepository.findAll();
        assertThat(agentAreaList).hasSize(databaseSizeBeforeCreate + 1);
        AgentArea testAgentArea = agentAreaList.get(agentAreaList.size() - 1);
        assertThat(testAgentArea.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createAgentAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentAreaRepository.findAll().size();

        // Create the AgentArea with an existing ID
        agentArea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentAreaMockMvc.perform(post("/api/agent-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentArea)))
            .andExpect(status().isBadRequest());

        // Validate the AgentArea in the database
        List<AgentArea> agentAreaList = agentAreaRepository.findAll();
        assertThat(agentAreaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgentAreas() throws Exception {
        // Initialize the database
        agentAreaRepository.saveAndFlush(agentArea);

        // Get all the agentAreaList
        restAgentAreaMockMvc.perform(get("/api/agent-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agentArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getAgentArea() throws Exception {
        // Initialize the database
        agentAreaRepository.saveAndFlush(agentArea);

        // Get the agentArea
        restAgentAreaMockMvc.perform(get("/api/agent-areas/{id}", agentArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agentArea.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgentArea() throws Exception {
        // Get the agentArea
        restAgentAreaMockMvc.perform(get("/api/agent-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgentArea() throws Exception {
        // Initialize the database
        agentAreaRepository.saveAndFlush(agentArea);

        int databaseSizeBeforeUpdate = agentAreaRepository.findAll().size();

        // Update the agentArea
        AgentArea updatedAgentArea = agentAreaRepository.findById(agentArea.getId()).get();
        // Disconnect from session so that the updates on updatedAgentArea are not directly saved in db
        em.detach(updatedAgentArea);
        updatedAgentArea
            .name(UPDATED_NAME);

        restAgentAreaMockMvc.perform(put("/api/agent-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgentArea)))
            .andExpect(status().isOk());

        // Validate the AgentArea in the database
        List<AgentArea> agentAreaList = agentAreaRepository.findAll();
        assertThat(agentAreaList).hasSize(databaseSizeBeforeUpdate);
        AgentArea testAgentArea = agentAreaList.get(agentAreaList.size() - 1);
        assertThat(testAgentArea.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingAgentArea() throws Exception {
        int databaseSizeBeforeUpdate = agentAreaRepository.findAll().size();

        // Create the AgentArea

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgentAreaMockMvc.perform(put("/api/agent-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentArea)))
            .andExpect(status().isBadRequest());

        // Validate the AgentArea in the database
        List<AgentArea> agentAreaList = agentAreaRepository.findAll();
        assertThat(agentAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgentArea() throws Exception {
        // Initialize the database
        agentAreaRepository.saveAndFlush(agentArea);

        int databaseSizeBeforeDelete = agentAreaRepository.findAll().size();

        // Get the agentArea
        restAgentAreaMockMvc.perform(delete("/api/agent-areas/{id}", agentArea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgentArea> agentAreaList = agentAreaRepository.findAll();
        assertThat(agentAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgentArea.class);
        AgentArea agentArea1 = new AgentArea();
        agentArea1.setId(1L);
        AgentArea agentArea2 = new AgentArea();
        agentArea2.setId(agentArea1.getId());
        assertThat(agentArea1).isEqualTo(agentArea2);
        agentArea2.setId(2L);
        assertThat(agentArea1).isNotEqualTo(agentArea2);
        agentArea1.setId(null);
        assertThat(agentArea1).isNotEqualTo(agentArea2);
    }
}
