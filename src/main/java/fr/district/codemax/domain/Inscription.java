package fr.district.codemax.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Inscription.
 */
@Entity
@Table(name = "inscription")
public class Inscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_equipe", nullable = false)
    private Integer nombreEquipe;

    @Column(name = "preinscription")
    private Boolean preinscription;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private Referent referent;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private Plateau plateau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNombreEquipe() {
        return nombreEquipe;
    }

    public Inscription nombreEquipe(Integer nombreEquipe) {
        this.nombreEquipe = nombreEquipe;
        return this;
    }

    public void setNombreEquipe(Integer nombreEquipe) {
        this.nombreEquipe = nombreEquipe;
    }

    public Boolean isPreinscription() {
        return preinscription;
    }

    public Inscription preinscription(Boolean preinscription) {
        this.preinscription = preinscription;
        return this;
    }

    public void setPreinscription(Boolean preinscription) {
        this.preinscription = preinscription;
    }

    public User getUser() {
        return user;
    }

    public Inscription user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Referent getReferent() {
        return referent;
    }

    public Inscription referent(Referent referent) {
        this.referent = referent;
        return this;
    }

    public void setReferent(Referent referent) {
        this.referent = referent;
    }

    public Plateau getPlateau() {
        return plateau;
    }

    public Inscription plateau(Plateau plateau) {
        this.plateau = plateau;
        return this;
    }

    public void setPlateau(Plateau plateau) {
        this.plateau = plateau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inscription)) {
            return false;
        }
        return id != null && id.equals(((Inscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Inscription{" +
            "id=" + getId() +
            ", nombreEquipe=" + getNombreEquipe() +
            ", preinscription='" + isPreinscription() + "'" +
            "}";
    }
}
