package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.MealTable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealTableRepository extends JpaRepository<MealTable, Long> {

}
