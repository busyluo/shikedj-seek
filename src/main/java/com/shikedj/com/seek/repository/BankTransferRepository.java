package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.BankTransfer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BankTransfer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankTransferRepository extends JpaRepository<BankTransfer, Long> {

}
