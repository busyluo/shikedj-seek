package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.MealOrder;
import com.shikedj.com.seek.repository.MealOrderRepository;
import com.shikedj.com.seek.web.rest.errors.BadRequestAlertException;
import com.shikedj.com.seek.web.rest.util.HeaderUtil;
import com.shikedj.com.seek.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MealOrder.
 */
@RestController
@RequestMapping("/api")
public class MealOrderResource {

    private final Logger log = LoggerFactory.getLogger(MealOrderResource.class);

    private static final String ENTITY_NAME = "mealOrder";

    private final MealOrderRepository mealOrderRepository;

    public MealOrderResource(MealOrderRepository mealOrderRepository) {
        this.mealOrderRepository = mealOrderRepository;
    }

    /**
     * POST  /meal-orders : Create a new mealOrder.
     *
     * @param mealOrder the mealOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealOrder, or with status 400 (Bad Request) if the mealOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-orders")
    @Timed
    public ResponseEntity<MealOrder> createMealOrder(@RequestBody MealOrder mealOrder) throws URISyntaxException {
        log.debug("REST request to save MealOrder : {}", mealOrder);
        if (mealOrder.getId() != null) {
            throw new BadRequestAlertException("A new mealOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealOrder result = mealOrderRepository.save(mealOrder);
        return ResponseEntity.created(new URI("/api/meal-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-orders : Updates an existing mealOrder.
     *
     * @param mealOrder the mealOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealOrder,
     * or with status 400 (Bad Request) if the mealOrder is not valid,
     * or with status 500 (Internal Server Error) if the mealOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-orders")
    @Timed
    public ResponseEntity<MealOrder> updateMealOrder(@RequestBody MealOrder mealOrder) throws URISyntaxException {
        log.debug("REST request to update MealOrder : {}", mealOrder);
        if (mealOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealOrder result = mealOrderRepository.save(mealOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-orders : get all the mealOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mealOrders in body
     */
    @GetMapping("/meal-orders")
    @Timed
    public ResponseEntity<List<MealOrder>> getAllMealOrders(Pageable pageable) {
        log.debug("REST request to get a page of MealOrders");
        Page<MealOrder> page = mealOrderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/meal-orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /meal-orders/:id : get the "id" mealOrder.
     *
     * @param id the id of the mealOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealOrder, or with status 404 (Not Found)
     */
    @GetMapping("/meal-orders/{id}")
    @Timed
    public ResponseEntity<MealOrder> getMealOrder(@PathVariable Long id) {
        log.debug("REST request to get MealOrder : {}", id);
        Optional<MealOrder> mealOrder = mealOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mealOrder);
    }

    /**
     * DELETE  /meal-orders/:id : delete the "id" mealOrder.
     *
     * @param id the id of the mealOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteMealOrder(@PathVariable Long id) {
        log.debug("REST request to delete MealOrder : {}", id);

        mealOrderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
