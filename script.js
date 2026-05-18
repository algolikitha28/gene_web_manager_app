let genes = [];
let editIndex = null;

/* Save Gene */

function saveGene(){

    const geneName = document.getElementById("geneName").value;
    const organism = document.getElementById("organism").value;
    const geneType = document.getElementById("geneType").value;
    const expression = document.getElementById("expression").value;
    const sequence = document.getElementById("sequence").value;

    if(!geneName || !organism || !sequence){

        alert("Please fill all required fields");
        return;
    }

    const geneData = {
        geneName,
        organism,
        geneType,
        expression,
        sequence
    };

    if(editIndex === null){

        genes.push(geneData);

    } else {

        genes[editIndex] = geneData;
        editIndex = null;
    }

    clearForm();
    renderGenes();
}

/* Render Gene Cards */

function renderGenes(){

    const geneList = document.getElementById("geneList");

    const search =
        document.getElementById("searchInput")
        .value.toLowerCase();

    geneList.innerHTML = "";

    const filteredGenes = genes.filter(gene =>

        gene.geneName.toLowerCase().includes(search) ||
        gene.organism.toLowerCase().includes(search)
    );

    filteredGenes.forEach((gene, index)=>{

        geneList.innerHTML += `

            <div class="gene-card">

                <h3>${gene.geneName}</h3>

                <p>
                    <strong>Organism:</strong>
                    ${gene.organism}
                </p>

                <p>
                    <strong>Expression:</strong>
                    ${gene.expression}
                </p>

                <p>
                    <strong>Sequence Length:</strong>
                    ${gene.sequence.length} bp
                </p>

                <p>
                    <strong>Sequence:</strong><br>
                    ${gene.sequence.substring(0,100)}...
                </p>

                <span class="tag">
                    ${gene.geneType}
                </span>

                <div class="actions">

                    <button class="edit-btn"
                        onclick="editGene(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteGene(${index})">
                        Delete
                    </button>

                </div>

            </div>
        `;
    });

    updateStats();
}

/* Edit */

function editGene(index){

    const gene = genes[index];

    document.getElementById("geneName").value = gene.geneName;
    document.getElementById("organism").value = gene.organism;
    document.getElementById("geneType").value = gene.geneType;
    document.getElementById("expression").value = gene.expression;
    document.getElementById("sequence").value = gene.sequence;

    editIndex = index;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

/* Delete */

function deleteGene(index){

    if(confirm("Delete this gene entry?")){

        genes.splice(index,1);
        renderGenes();
    }
}

/* Clear Form */

function clearForm(){

    document.getElementById("geneName").value = "";
    document.getElementById("organism").value = "";
    document.getElementById("geneType").value = "Protein Coding";
    document.getElementById("expression").value = "";
    document.getElementById("sequence").value = "";

    editIndex = null;
}

/* Update Stats */

function updateStats(){

    document.getElementById("totalGenes").innerText =
        genes.length;

    const proteinCoding = genes.filter(
        gene => gene.geneType === "Protein Coding"
    ).length;

    document.getElementById("proteinCount").innerText =
        proteinCoding;

    const uniqueOrganisms =
        new Set(genes.map(g => g.organism)).size;

    document.getElementById("organismCount").innerText =
        uniqueOrganisms;
}

/* Sample Data */

genes.push(

    {
        geneName:"BRCA1",
        organism:"Human",
        geneType:"Protein Coding",
        expression:85,
        sequence:"ATCGATCGATCGATCGATCGATCGATCG"
    },

    {
        geneName:"TP53",
        organism:"Mouse",
        geneType:"Regulatory",
        expression:62,
        sequence:"GGCTAGCTAGCTAGCTA"
    }
);

renderGenes();