package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.AgentArea;
import com.shikedj.com.seek.repository.AgentAreaRepository;
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
 * REST controller for managing AgentArea.
 */
@RestController
@RequestMapping("/api")
public class AgentAreaResource {

    private final Logger log = LoggerFactory.getLogger(AgentAreaResource.class);

    private static final String ENTITY_NAME = "agentArea";

    private final AgentAreaRepository agentAreaRepository;

    public AgentAreaResource(AgentAreaRepository agentAreaRepository) {
        this.agentAreaRepository = agentAreaRepository;
    }

    /**
     * POST  /agent-areas : Create a new agentArea.
     *
     * @param agentArea the agentArea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agentArea, or with status 400 (Bad Request) if the agentArea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agent-areas")
    @Timed
    public ResponseEntity<AgentArea> createAgentArea(@RequestBody AgentArea agentArea) throws URISyntaxException {
        log.debug("REST request to save AgentArea : {}", agentArea);
        if (agentArea.getId() != null) {
            throw new BadRequestAlertException("A new agentArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgentArea result = agentAreaRepository.save(agentArea);
        return ResponseEntity.created(new URI("/api/agent-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agent-areas : Updates an existing agentArea.
     *
     * @param agentArea the agentArea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agentArea,
     * or with status 400 (Bad Request) if the agentArea is not valid,
     * or with status 500 (Internal Server Error) if the agentArea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agent-areas")
    @Timed
    public ResponseEntity<AgentArea> updateAgentArea(@RequestBody AgentArea agentArea) throws URISyntaxException {
        log.debug("REST request to update AgentArea : {}", agentArea);
        if (agentArea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgentArea result = agentAreaRepository.save(agentArea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agentArea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agent-areas : get all the agentAreas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agentAreas in body
     */
    @GetMapping("/agent-areas")
    @Timed
    public List<AgentArea> getAllAgentAreas() {
        log.debug("REST request to get all AgentAreas");
        return agentAreaRepository.findAll();
    }

    /**
     * GET  /agent-areas/:id : get the "id" agentArea.
     *
     * @param id the id of the agentArea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agentArea, or with status 404 (Not Found)
     */
    @GetMapping("/agent-areas/{id}")
    @Timed
    public ResponseEntity<AgentArea> getAgentArea(@PathVariable Long id) {
        log.debug("REST request to get AgentArea : {}", id);
        Optional<AgentArea> agentArea = agentAreaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agentArea);
    }

    /**
     * DELETE  /agent-areas/:id : delete the "id" agentArea.
     *
     * @param id the id of the agentArea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agent-areas/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgentArea(@PathVariable Long id) {
        log.debug("REST request to delete AgentArea : {}", id);

        agentAreaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
