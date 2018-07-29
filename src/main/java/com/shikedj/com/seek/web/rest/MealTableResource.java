package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.MealTable;
import com.shikedj.com.seek.repository.MealTableRepository;
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
 * REST controller for managing MealTable.
 */
@RestController
@RequestMapping("/api")
public class MealTableResource {

    private final Logger log = LoggerFactory.getLogger(MealTableResource.class);

    private static final String ENTITY_NAME = "mealTable";

    private final MealTableRepository mealTableRepository;

    public MealTableResource(MealTableRepository mealTableRepository) {
        this.mealTableRepository = mealTableRepository;
    }

    /**
     * POST  /meal-tables : Create a new mealTable.
     *
     * @param mealTable the mealTable to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mealTable, or with status 400 (Bad Request) if the mealTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meal-tables")
    @Timed
    public ResponseEntity<MealTable> createMealTable(@RequestBody MealTable mealTable) throws URISyntaxException {
        log.debug("REST request to save MealTable : {}", mealTable);
        if (mealTable.getId() != null) {
            throw new BadRequestAlertException("A new mealTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealTable result = mealTableRepository.save(mealTable);
        return ResponseEntity.created(new URI("/api/meal-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meal-tables : Updates an existing mealTable.
     *
     * @param mealTable the mealTable to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mealTable,
     * or with status 400 (Bad Request) if the mealTable is not valid,
     * or with status 500 (Internal Server Error) if the mealTable couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meal-tables")
    @Timed
    public ResponseEntity<MealTable> updateMealTable(@RequestBody MealTable mealTable) throws URISyntaxException {
        log.debug("REST request to update MealTable : {}", mealTable);
        if (mealTable.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealTable result = mealTableRepository.save(mealTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mealTable.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meal-tables : get all the mealTables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mealTables in body
     */
    @GetMapping("/meal-tables")
    @Timed
    public List<MealTable> getAllMealTables() {
        log.debug("REST request to get all MealTables");
        return mealTableRepository.findAll();
    }

    /**
     * GET  /meal-tables/:id : get the "id" mealTable.
     *
     * @param id the id of the mealTable to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mealTable, or with status 404 (Not Found)
     */
    @GetMapping("/meal-tables/{id}")
    @Timed
    public ResponseEntity<MealTable> getMealTable(@PathVariable Long id) {
        log.debug("REST request to get MealTable : {}", id);
        Optional<MealTable> mealTable = mealTableRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mealTable);
    }

    /**
     * DELETE  /meal-tables/:id : delete the "id" mealTable.
     *
     * @param id the id of the mealTable to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meal-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteMealTable(@PathVariable Long id) {
        log.debug("REST request to delete MealTable : {}", id);

        mealTableRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
