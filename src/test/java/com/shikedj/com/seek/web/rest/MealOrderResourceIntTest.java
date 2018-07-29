package com.shikedj.com.seek.web.rest;

import com.shikedj.com.seek.SeekApp;

import com.shikedj.com.seek.domain.MealOrder;
import com.shikedj.com.seek.repository.MealOrderRepository;
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

import com.shikedj.com.seek.domain.enumeration.MealOrderType;
import com.shikedj.com.seek.domain.enumeration.MealOrderStatus;
/**
 * Test class for the MealOrderResource REST controller.
 *
 * @see MealOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SeekApp.class)
public class MealOrderResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final MealOrderType DEFAULT_TYPE = MealOrderType.NORMAL;
    private static final MealOrderType UPDATED_TYPE = MealOrderType.APPOINTMENT;

    private static final MealOrderStatus DEFAULT_STATUS = MealOrderStatus.CREATED;
    private static final MealOrderStatus UPDATED_STATUS = MealOrderStatus.APPOINTMENT_CREATED;

    private static final Double DEFAULT_POINT_USAGE = 1D;
    private static final Double UPDATED_POINT_USAGE = 2D;

    private static final Double DEFAULT_PAID_AMOUNT = 1D;
    private static final Double UPDATED_PAID_AMOUNT = 2D;

    private static final Double DEFAULT_ACTUAL_PAY = 1D;
    private static final Double UPDATED_ACTUAL_PAY = 2D;

    private static final Double DEFAULT_TOTAL_PRICE = 1D;
    private static final Double UPDATED_TOTAL_PRICE = 2D;

    @Autowired
    private MealOrderRepository mealOrderRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMealOrderMockMvc;

    private MealOrder mealOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealOrderResource mealOrderResource = new MealOrderResource(mealOrderRepository);
        this.restMealOrderMockMvc = MockMvcBuilders.standaloneSetup(mealOrderResource)
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
    public static MealOrder createEntity(EntityManager em) {
        MealOrder mealOrder = new MealOrder()
            .time(DEFAULT_TIME)
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS)
            .pointUsage(DEFAULT_POINT_USAGE)
            .paidAmount(DEFAULT_PAID_AMOUNT)
            .actualPay(DEFAULT_ACTUAL_PAY)
            .totalPrice(DEFAULT_TOTAL_PRICE);
        return mealOrder;
    }

    @Before
    public void initTest() {
        mealOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealOrder() throws Exception {
        int databaseSizeBeforeCreate = mealOrderRepository.findAll().size();

        // Create the MealOrder
        restMealOrderMockMvc.perform(post("/api/meal-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrder)))
            .andExpect(status().isCreated());

        // Validate the MealOrder in the database
        List<MealOrder> mealOrderList = mealOrderRepository.findAll();
        assertThat(mealOrderList).hasSize(databaseSizeBeforeCreate + 1);
        MealOrder testMealOrder = mealOrderList.get(mealOrderList.size() - 1);
        assertThat(testMealOrder.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testMealOrder.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMealOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testMealOrder.getPointUsage()).isEqualTo(DEFAULT_POINT_USAGE);
        assertThat(testMealOrder.getPaidAmount()).isEqualTo(DEFAULT_PAID_AMOUNT);
        assertThat(testMealOrder.getActualPay()).isEqualTo(DEFAULT_ACTUAL_PAY);
        assertThat(testMealOrder.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void createMealOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealOrderRepository.findAll().size();

        // Create the MealOrder with an existing ID
        mealOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealOrderMockMvc.perform(post("/api/meal-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrder)))
            .andExpect(status().isBadRequest());

        // Validate the MealOrder in the database
        List<MealOrder> mealOrderList = mealOrderRepository.findAll();
        assertThat(mealOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMealOrders() throws Exception {
        // Initialize the database
        mealOrderRepository.saveAndFlush(mealOrder);

        // Get all the mealOrderList
        restMealOrderMockMvc.perform(get("/api/meal-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].pointUsage").value(hasItem(DEFAULT_POINT_USAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].paidAmount").value(hasItem(DEFAULT_PAID_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].actualPay").value(hasItem(DEFAULT_ACTUAL_PAY.doubleValue())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getMealOrder() throws Exception {
        // Initialize the database
        mealOrderRepository.saveAndFlush(mealOrder);

        // Get the mealOrder
        restMealOrderMockMvc.perform(get("/api/meal-orders/{id}", mealOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealOrder.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.pointUsage").value(DEFAULT_POINT_USAGE.doubleValue()))
            .andExpect(jsonPath("$.paidAmount").value(DEFAULT_PAID_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.actualPay").value(DEFAULT_ACTUAL_PAY.doubleValue()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMealOrder() throws Exception {
        // Get the mealOrder
        restMealOrderMockMvc.perform(get("/api/meal-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealOrder() throws Exception {
        // Initialize the database
        mealOrderRepository.saveAndFlush(mealOrder);

        int databaseSizeBeforeUpdate = mealOrderRepository.findAll().size();

        // Update the mealOrder
        MealOrder updatedMealOrder = mealOrderRepository.findById(mealOrder.getId()).get();
        // Disconnect from session so that the updates on updatedMealOrder are not directly saved in db
        em.detach(updatedMealOrder);
        updatedMealOrder
            .time(UPDATED_TIME)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS)
            .pointUsage(UPDATED_POINT_USAGE)
            .paidAmount(UPDATED_PAID_AMOUNT)
            .actualPay(UPDATED_ACTUAL_PAY)
            .totalPrice(UPDATED_TOTAL_PRICE);

        restMealOrderMockMvc.perform(put("/api/meal-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealOrder)))
            .andExpect(status().isOk());

        // Validate the MealOrder in the database
        List<MealOrder> mealOrderList = mealOrderRepository.findAll();
        assertThat(mealOrderList).hasSize(databaseSizeBeforeUpdate);
        MealOrder testMealOrder = mealOrderList.get(mealOrderList.size() - 1);
        assertThat(testMealOrder.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testMealOrder.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMealOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testMealOrder.getPointUsage()).isEqualTo(UPDATED_POINT_USAGE);
        assertThat(testMealOrder.getPaidAmount()).isEqualTo(UPDATED_PAID_AMOUNT);
        assertThat(testMealOrder.getActualPay()).isEqualTo(UPDATED_ACTUAL_PAY);
        assertThat(testMealOrder.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingMealOrder() throws Exception {
        int databaseSizeBeforeUpdate = mealOrderRepository.findAll().size();

        // Create the MealOrder

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMealOrderMockMvc.perform(put("/api/meal-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealOrder)))
            .andExpect(status().isBadRequest());

        // Validate the MealOrder in the database
        List<MealOrder> mealOrderList = mealOrderRepository.findAll();
        assertThat(mealOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMealOrder() throws Exception {
        // Initialize the database
        mealOrderRepository.saveAndFlush(mealOrder);

        int databaseSizeBeforeDelete = mealOrderRepository.findAll().size();

        // Get the mealOrder
        restMealOrderMockMvc.perform(delete("/api/meal-orders/{id}", mealOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MealOrder> mealOrderList = mealOrderRepository.findAll();
        assertThat(mealOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealOrder.class);
        MealOrder mealOrder1 = new MealOrder();
        mealOrder1.setId(1L);
        MealOrder mealOrder2 = new MealOrder();
        mealOrder2.setId(mealOrder1.getId());
        assertThat(mealOrder1).isEqualTo(mealOrder2);
        mealOrder2.setId(2L);
        assertThat(mealOrder1).isNotEqualTo(mealOrder2);
        mealOrder1.setId(null);
        assertThat(mealOrder1).isNotEqualTo(mealOrder2);
    }
}
