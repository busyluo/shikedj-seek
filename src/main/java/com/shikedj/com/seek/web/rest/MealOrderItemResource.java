package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.MealOrderItem;
import com.shikedj.com.seek.repository.MealOrderItemRepository;
import com.shikedj.com.seek.web.rest.errors.BadRequestAlertException;
import com.shikedj.com.seek.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MealOrderItem.
 */
@RestController
@RequestMapping("/api")
public class MealOrderItemResource {

    private final Logger log = LoggerFactory.getLogger(MealOrderItemResource.class);

    private static final String ENTITY_NAME = "mealOrderItem";

    private final MealOrderItemRepository mealOrderItemRepository;

    public MealOrderItemResource(MealOrderItemRepository mealOrderItemRepository) {
        this.mealOrderItemRepository = mealOrderItemRepository;
    }

    /**
     * POST  /meal-order-items : Create a new mealOrderItem.
     *
     * @param mealOrderItem the mealOrderItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealOrderItem, or with status 400 (Bad Request) if the mealOrderItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-order-items")
    @Timed
    public ResponseEntity<MealOrderItem> createMealOrderItem(@RequestBody MealOrderItem mealOrderItem) throws URISyntaxException {
        log.debug("REST request to save MealOrderItem : {}", mealOrderItem);
        if (mealOrderItem.getId() != null) {
            throw new BadRequestAlertException("A new mealOrderItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealOrderItem result = mealOrderItemRepository.save(mealOrderItem);
        return ResponseEntity.created(new URI("/api/meal-order-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-order-items : Updates an existing mealOrderItem.
     *
     * @param mealOrderItem the mealOrderItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealOrderItem,
     * or with status 400 (Bad Request) if the mealOrderItem is not valid,
     * or with status 500 (Internal Server Error) if the mealOrderItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-order-items")
    @Timed
    public ResponseEntity<MealOrderItem> updateMealOrderItem(@RequestBody MealOrderItem mealOrderItem) throws URISyntaxException {
        log.debug("REST request to update MealOrderItem : {}", mealOrderItem);
        if (mealOrderItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealOrderItem result = mealOrderItemRepository.save(mealOrderItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealOrderItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-order-items : get all the mealOrderItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealOrderItems in body
     */
    @GetMapping("/meal-order-items")
    @Timed
    public List<MealOrderItem> getAllMealOrderItems() {
        log.debug("REST request to get all MealOrderItems");
        return mealOrderItemRepository.findAll();
    }

    /**
     * GET  /meal-order-items/:id : get the "id" mealOrderItem.
     *
     * @param id the id of the mealOrderItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealOrderItem, or with status 404 (Not Found)
     */
    @GetMapping("/meal-order-items/{id}")
    @Timed
    public ResponseEntity<MealOrderItem> getMealOrderItem(@PathVariable Long id) {
        log.debug("REST request to get MealOrderItem : {}", id);
        Optional<MealOrderItem> mealOrderItem = mealOrderItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mealOrderItem);
    }

    /**
     * DELETE  /meal-order-items/:id : delete the "id" mealOrderItem.
     *
     * @param id the id of the mealOrderItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-order-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteMealOrderItem(@PathVariable Long id) {
        log.debug("REST request to delete MealOrderItem : {}", id);

        mealOrderItemRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
