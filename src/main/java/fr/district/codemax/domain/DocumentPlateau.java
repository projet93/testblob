package fr.district.codemax.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DocumentPlateau.
 */
@Entity
@Table(name = "document_plateau")
public class DocumentPlateau implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "programme")
    private byte[] programme;

    @Column(name = "programme_content_type")
    private String programmeContentType;

    @OneToOne(mappedBy = "documentPlateau")
    @JsonIgnore
    private Plateau plateau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getProgramme() {
        return programme;
    }

    public DocumentPlateau programme(byte[] programme) {
        this.programme = programme;
        return this;
    }

    public void setProgramme(byte[] programme) {
        this.programme = programme;
    }

    public String getProgrammeContentType() {
        return programmeContentType;
    }

    public DocumentPlateau programmeContentType(String programmeContentType) {
        this.programmeContentType = programmeContentType;
        return this;
    }

    public void setProgrammeContentType(String programmeContentType) {
        this.programmeContentType = programmeContentType;
    }

    public Plateau getPlateau() {
        return plateau;
    }

    public DocumentPlateau plateau(Plateau plateau) {
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
        if (!(o instanceof DocumentPlateau)) {
            return false;
        }
        return id != null && id.equals(((DocumentPlateau) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DocumentPlateau{" +
            "id=" + getId() +
            ", programme='" + getProgramme() + "'" +
            ", programmeContentType='" + getProgrammeContentType() + "'" +
            "}";
    }
}
