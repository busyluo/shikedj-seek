package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.BonusPool;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BonusPool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BonusPoolRepository extends JpaRepository<BonusPool, Long> {

}
