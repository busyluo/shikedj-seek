package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.Cuisine;
import com.shikedj.com.seek.repository.CuisineRepository;
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
 * Test class for the CuisineResource REST controller.
 *
 * @see CuisineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class CuisineResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CuisineRepository cuisineRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCuisineMockMvc;

    private Cuisine cuisine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CuisineResource cuisineResource = new CuisineResource(cuisineRepository);
        this.restCuisineMockMvc = MockMvcBuilders.standaloneSetup(cuisineResource)
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
    public static Cuisine createEntity(EntityManager em) {
        Cuisine cuisine = new Cuisine()
            .name(DEFAULT_NAME);
        return cuisine;
    }

    @Before
    public void initTest() {
        cuisine = createEntity(em);
    }

    @Test
    @Transactional
    public void createCuisine() throws Exception {
        int databaseSizeBeforeCreate = cuisineRepository.findAll().size();

        // Create the Cuisine
        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisine)))
            .andExpect(status().isCreated());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeCreate + 1);
        Cuisine testCuisine = cuisineList.get(cuisineList.size() - 1);
        assertThat(testCuisine.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCuisineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cuisineRepository.findAll().size();

        // Create the Cuisine with an existing ID
        cuisine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCuisineMockMvc.perform(post("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisine)))
            .andExpect(status().isBadRequest());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCuisines() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get all the cuisineList
        restCuisineMockMvc.perform(get("/api/cuisines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuisine.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        // Get the cuisine
        restCuisineMockMvc.perform(get("/api/cuisines/{id}", cuisine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cuisine.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCuisine() throws Exception {
        // Get the cuisine
        restCuisineMockMvc.perform(get("/api/cuisines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        int databaseSizeBeforeUpdate = cuisineRepository.findAll().size();

        // Update the cuisine
        Cuisine updatedCuisine = cuisineRepository.findById(cuisine.getId()).get();
        // Disconnect from session so that the updates on updatedCuisine are not directly saved in db
        em.detach(updatedCuisine);
        updatedCuisine
            .name(UPDATED_NAME);

        restCuisineMockMvc.perform(put("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCuisine)))
            .andExpect(status().isOk());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeUpdate);
        Cuisine testCuisine = cuisineList.get(cuisineList.size() - 1);
        assertThat(testCuisine.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCuisine() throws Exception {
        int databaseSizeBeforeUpdate = cuisineRepository.findAll().size();

        // Create the Cuisine

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCuisineMockMvc.perform(put("/api/cuisines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cuisine)))
            .andExpect(status().isBadRequest());

        // Validate the Cuisine in the database
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCuisine() throws Exception {
        // Initialize the database
        cuisineRepository.saveAndFlush(cuisine);

        int databaseSizeBeforeDelete = cuisineRepository.findAll().size();

        // Get the cuisine
        restCuisineMockMvc.perform(delete("/api/cuisines/{id}", cuisine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cuisine> cuisineList = cuisineRepository.findAll();
        assertThat(cuisineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cuisine.class);
        Cuisine cuisine1 = new Cuisine();
        cuisine1.setId(1L);
        Cuisine cuisine2 = new Cuisine();
        cuisine2.setId(cuisine1.getId());
        assertThat(cuisine1).isEqualTo(cuisine2);
        cuisine2.setId(2L);
        assertThat(cuisine1).isNotEqualTo(cuisine2);
        cuisine1.setId(null);
        assertThat(cuisine1).isNotEqualTo(cuisine2);
    }
}
