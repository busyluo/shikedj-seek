package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 订单里的菜品
 */
@ApiModel(description = "订单里的菜品")
@Entity
@Table(name = "meal_order_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MealOrderItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Integer amount;

    @OneToOne
    @JoinColumn(unique = true)
    private Dish dish;

    @ManyToOne
    @JsonIgnoreProperties("dishes")
    private MealOrder order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAmount() {
        return amount;
    }

    public MealOrderItem amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Dish getDish() {
        return dish;
    }

    public MealOrderItem dish(Dish dish) {
        this.dish = dish;
        return this;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }

    public MealOrder getOrder() {
        return order;
    }

    public MealOrderItem order(MealOrder mealOrder) {
        this.order = mealOrder;
        return this;
    }

    public void setOrder(MealOrder mealOrder) {
        this.order = mealOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MealOrderItem mealOrderItem = (MealOrderItem) o;
        if (mealOrderItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealOrderItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealOrderItem{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
