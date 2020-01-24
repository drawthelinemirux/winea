package org.jhipster.winea.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A RequestLeave.
 */
@Entity
@Table(name = "request_leave")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RequestLeave implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "employeeid")
    private Long employeeid;

    @Column(name = "accepted_leave")
    private Long acceptedLeave;

    @ManyToOne
    @JsonIgnoreProperties("requestleaves")
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public RequestLeave startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public RequestLeave endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Long getEmployeeid() {
        return employeeid;
    }

    public RequestLeave employeeid(Long employeeid) {
        this.employeeid = employeeid;
        return this;
    }

    public void setEmployeeid(Long employeeid) {
        this.employeeid = employeeid;
    }

    public Long getAcceptedLeave() {
        return acceptedLeave;
    }

    public RequestLeave acceptedLeave(Long acceptedLeave) {
        this.acceptedLeave = acceptedLeave;
        return this;
    }

    public void setAcceptedLeave(Long acceptedLeave) {
        this.acceptedLeave = acceptedLeave;
    }

    public Employee getEmployee() {
        return employee;
    }

    public RequestLeave employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestLeave)) {
            return false;
        }
        return id != null && id.equals(((RequestLeave) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RequestLeave{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", employeeid=" + getEmployeeid() +
            ", acceptedLeave=" + getAcceptedLeave() +
            "}";
    }
}
