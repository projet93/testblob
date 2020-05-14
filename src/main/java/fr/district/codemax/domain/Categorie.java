package fr.district.codemax.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.district.codemax.domain.enumeration.Section;

/**
 * A Categorie.
 */
@Entity
@Table(name = "categorie")
public class Categorie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "section")
    private Section section;

    @Column(name = "descrition")
    private String descrition;

    @ManyToMany(mappedBy = "categories",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Club> clubs = new HashSet<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Referent> referents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Section getSection() {
        return section;
    }

    public Categorie section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public String getDescrition() {
        return descrition;
    }

    public Categorie descrition(String descrition) {
        this.descrition = descrition;
        return this;
    }

    public void setDescrition(String descrition) {
        this.descrition = descrition;
    }

    public Set<Club> getClubs() {
        return clubs;
    }

    public Categorie clubs(Set<Club> clubs) {
        this.clubs = clubs;
        return this;
    }

    public Categorie addClub(Club club) {
        this.clubs.add(club);
        club.getCategories().add(this);
        return this;
    }

    public Categorie removeClub(Club club) {
        this.clubs.remove(club);
        club.getCategories().remove(this);
        return this;
    }

    public void setClubs(Set<Club> clubs) {
        this.clubs = clubs;
    }

    public Set<Referent> getReferents() {
        return referents;
    }

    public Categorie referents(Set<Referent> referents) {
        this.referents = referents;
        return this;
    }

    public Categorie addReferent(Referent referent) {
        this.referents.add(referent);
        referent.getCategories().add(this);
        return this;
    }

    public Categorie removeReferent(Referent referent) {
        this.referents.remove(referent);
        referent.getCategories().remove(this);
        return this;
    }

    public void setReferents(Set<Referent> referents) {
        this.referents = referents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Categorie)) {
            return false;
        }
        return id != null && id.equals(((Categorie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Categorie{" +
            "id=" + getId() +
            ", section='" + getSection() + "'" +
            ", descrition='" + getDescrition() + "'" +
            "}";
    }
}
