package com.shikedj.com.seek.repository;

import com.shikedj.com.seek.domain.MealOrderItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealOrderItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealOrderItemRepository extends JpaRepository<MealOrderItem, Long> {

}
