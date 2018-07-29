package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.Bonus;
import com.shikedj.com.seek.repository.BonusRepository;
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
 * REST controller for managing Bonus.
 */
@RestController
@RequestMapping("/api")
public class BonusResource {

    private final Logger log = LoggerFactory.getLogger(BonusResource.class);

    private static final String ENTITY_NAME = "bonus";

    private final BonusRepository bonusRepository;

    public BonusResource(BonusRepository bonusRepository) {
        this.bonusRepository = bonusRepository;
    }

    /**
     * POST  /bonuses : Create a new bonus.
     *
     * @param bonus the bonus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bonus, or with status 400 (Bad Request) if the bonus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bonuses")
    @Timed
    public ResponseEntity<Bonus> createBonus(@RequestBody Bonus bonus) throws URISyntaxException {
        log.debug("REST request to save Bonus : {}", bonus);
        if (bonus.getId() != null) {
            throw new BadRequestAlertException("A new bonus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bonus result = bonusRepository.save(bonus);
        return ResponseEntity.created(new URI("/api/bonuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bonuses : Updates an existing bonus.
     *
     * @param bonus the bonus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bonus,
     * or with status 400 (Bad Request) if the bonus is not valid,
     * or with status 500 (Internal Server Error) if the bonus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bonuses")
    @Timed
    public ResponseEntity<Bonus> updateBonus(@RequestBody Bonus bonus) throws URISyntaxException {
        log.debug("REST request to update Bonus : {}", bonus);
        if (bonus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bonus result = bonusRepository.save(bonus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bonus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bonuses : get all the bonuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bonuses in body
     */
    @GetMapping("/bonuses")
    @Timed
    public List<Bonus> getAllBonuses() {
        log.debug("REST request to get all Bonuses");
        return bonusRepository.findAll();
    }

    /**
     * GET  /bonuses/:id : get the "id" bonus.
     *
     * @param id the id of the bonus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bonus, or with status 404 (Not Found)
     */
    @GetMapping("/bonuses/{id}")
    @Timed
    public ResponseEntity<Bonus> getBonus(@PathVariable Long id) {
        log.debug("REST request to get Bonus : {}", id);
        Optional<Bonus> bonus = bonusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonus);
    }

    /**
     * DELETE  /bonuses/:id : delete the "id" bonus.
     *
     * @param id the id of the bonus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bonuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteBonus(@PathVariable Long id) {
        log.debug("REST request to delete Bonus : {}", id);

        bonusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
