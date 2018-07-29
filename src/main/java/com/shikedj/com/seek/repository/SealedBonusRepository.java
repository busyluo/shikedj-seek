package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.SealedBonus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SealedBonus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SealedBonusRepository extends JpaRepository<SealedBonus, Long> {

}
