package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * 封印红包
 */
@ApiModel(description = "封印红包")
@Entity
@Table(name = "sealed_bonus")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SealedBonus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "progress")
    private Integer progress;

    @Column(name = "amount")
    private Double amount;

    @OneToOne
    @JoinColumn(unique = true)
    private MealOrder order;

    @ManyToOne
    @JsonIgnoreProperties("sealedBonuses")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProgress() {
        return progress;
    }

    public SealedBonus progress(Integer progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Double getAmount() {
        return amount;
    }

    public SealedBonus amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public MealOrder getOrder() {
        return order;
    }

    public SealedBonus order(MealOrder mealOrder) {
        this.order = mealOrder;
        return this;
    }

    public void setOrder(MealOrder mealOrder) {
        this.order = mealOrder;
    }

    public Customer getCustomer() {
        return customer;
    }

    public SealedBonus customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        SealedBonus sealedBonus = (SealedBonus) o;
        if (sealedBonus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sealedBonus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SealedBonus{" +
            "id=" + getId() +
            ", progress=" + getProgress() +
            ", amount=" + getAmount() +
            "}";
    }
}
