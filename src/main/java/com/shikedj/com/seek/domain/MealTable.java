package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.shikedj.com.seek.domain.enumeration.TableType;

import com.shikedj.com.seek.domain.enumeration.TableStatus;

/**
 * 桌位
 */
@ApiModel(description = "桌位")
@Entity
@Table(name = "meal_table")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MealTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TableType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TableStatus status;

    @ManyToOne
    @JsonIgnoreProperties("tables")
    private Restaurant restaurant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TableType getType() {
        return type;
    }

    public MealTable type(TableType type) {
        this.type = type;
        return this;
    }

    public void setType(TableType type) {
        this.type = type;
    }

    public TableStatus getStatus() {
        return status;
    }

    public MealTable status(TableStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TableStatus status) {
        this.status = status;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public MealTable restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
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
        MealTable mealTable = (MealTable) o;
        if (mealTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealTable{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
