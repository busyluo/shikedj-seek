package com.shikedj.com.seek.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.shikedj.com.seek.domain.BankTransfer;
import com.shikedj.com.seek.repository.BankTransferRepository;
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
 * REST controller for managing BankTransfer.
 */
@RestController
@RequestMapping("/api")
public class BankTransferResource {

    private final Logger log = LoggerFactory.getLogger(BankTransferResource.class);

    private static final String ENTITY_NAME = "bankTransfer";

    private final BankTransferRepository bankTransferRepository;

    public BankTransferResource(BankTransferRepository bankTransferRepository) {
        this.bankTransferRepository = bankTransferRepository;
    }

    /**
     * POST  /bank-transfers : Create a new bankTransfer.
     *
     * @param bankTransfer the bankTransfer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankTransfer, or with status 400 (Bad Request) if the bankTransfer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bank-transfers")
    @Timed
    public ResponseEntity<BankTransfer> createBankTransfer(@RequestBody BankTransfer bankTransfer) throws URISyntaxException {
        log.debug("REST request to save BankTransfer : {}", bankTransfer);
        if (bankTransfer.getId() != null) {
            throw new BadRequestAlertException("A new bankTransfer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankTransfer result = bankTransferRepository.save(bankTransfer);
        return ResponseEntity.created(new URI("/api/bank-transfers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bank-transfers : Updates an existing bankTransfer.
     *
     * @param bankTransfer the bankTransfer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankTransfer,
     * or with status 400 (Bad Request) if the bankTransfer is not valid,
     * or with status 500 (Internal Server Error) if the bankTransfer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bank-transfers")
    @Timed
    public ResponseEntity<BankTransfer> updateBankTransfer(@RequestBody BankTransfer bankTransfer) throws URISyntaxException {
        log.debug("REST request to update BankTransfer : {}", bankTransfer);
        if (bankTransfer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BankTransfer result = bankTransferRepository.save(bankTransfer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankTransfer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bank-transfers : get all the bankTransfers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bankTransfers in body
     */
    @GetMapping("/bank-transfers")
    @Timed
    public List<BankTransfer> getAllBankTransfers() {
        log.debug("REST request to get all BankTransfers");
        return bankTransferRepository.findAll();
    }

    /**
     * GET  /bank-transfers/:id : get the "id" bankTransfer.
     *
     * @param id the id of the bankTransfer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankTransfer, or with status 404 (Not Found)
     */
    @GetMapping("/bank-transfers/{id}")
    @Timed
    public ResponseEntity<BankTransfer> getBankTransfer(@PathVariable Long id) {
        log.debug("REST request to get BankTransfer : {}", id);
        Optional<BankTransfer> bankTransfer = bankTransferRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bankTransfer);
    }

    /**
     * DELETE  /bank-transfers/:id : delete the "id" bankTransfer.
     *
     * @param id the id of the bankTransfer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bank-transfers/{id}")
    @Timed
    public ResponseEntity<Void> deleteBankTransfer(@PathVariable Long id) {
        log.debug("REST request to delete BankTransfer : {}", id);

        bankTransferRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
