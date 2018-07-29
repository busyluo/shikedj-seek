package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.MealOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealOrderRepository extends JpaRepository<MealOrder, Long> {

}
