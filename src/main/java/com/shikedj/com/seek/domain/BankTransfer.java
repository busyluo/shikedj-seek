package com.shikedj.com.seek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * 转账记录
 */
@ApiModel(description = "转账记录")
@Entity
@Table(name = "bank_transfer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BankTransfer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_time")
    private Instant time;

    @Column(name = "amount")
    private Double amount;

    @ManyToOne
    @JsonIgnoreProperties("")
    private BankAccount bank;

    @ManyToOne
    @JsonIgnoreProperties("")
    private UserExtra user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public BankTransfer time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public Double getAmount() {
        return amount;
    }

    public BankTransfer amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public BankAccount getBank() {
        return bank;
    }

    public BankTransfer bank(BankAccount bankAccount) {
        this.bank = bankAccount;
        return this;
    }

    public void setBank(BankAccount bankAccount) {
        this.bank = bankAccount;
    }

    public UserExtra getUser() {
        return user;
    }

    public BankTransfer user(UserExtra userExtra) {
        this.user = userExtra;
        return this;
    }

    public void setUser(UserExtra userExtra) {
        this.user = userExtra;
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
        BankTransfer bankTransfer = (BankTransfer) o;
        if (bankTransfer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankTransfer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankTransfer{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
