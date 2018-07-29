package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * 奖金池
 */
@ApiModel(description = "奖金池")
@Entity
@Table(name = "bonus_pool")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BonusPool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "used")
    private Double used;

    @Column(name = "total")
    private Double total;

    @OneToOne(mappedBy = "bonusPool")
    @JsonIgnore
    private AgentArea area;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public BonusPool date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getUsed() {
        return used;
    }

    public BonusPool used(Double used) {
        this.used = used;
        return this;
    }

    public void setUsed(Double used) {
        this.used = used;
    }

    public Double getTotal() {
        return total;
    }

    public BonusPool total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public AgentArea getArea() {
        return area;
    }

    public BonusPool area(AgentArea agentArea) {
        this.area = agentArea;
        return this;
    }

    public void setArea(AgentArea agentArea) {
        this.area = agentArea;
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
        BonusPool bonusPool = (BonusPool) o;
        if (bonusPool.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bonusPool.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BonusPool{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", used=" + getUsed() +
            ", total=" + getTotal() +
            "}";
    }
}
