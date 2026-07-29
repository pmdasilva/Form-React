from pymongo import MongoClient
import pandas as pd
import json
import os
import logging

# ==================================================
# CONFIGURAÇÕES
# ==================================================

MONGO_URI = "mongodb://core-local-4p-aura-brain-pro-cosmosdb:SWbSbRw7K8z7ODssj9q0CKW4yWy6glIbeV1Ttqom83KlDWNya5DNMQConwJGep8ngDTax7gYtO6yACDb1Plipw%3D%3D@core-local-4p-aura-brain-pro-cosmosdb.mongo.cosmos.azure.com:10255/ms-embeddings-api?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@core-local-4p-aura-brain-pro-cosmosdb@"
DATABASE = "ms-embeddings-api"
COLLECTION = "knowledge-base"

LIMIT = 5

CHECKPOINT_FILE = "checkpoint.json"
EXCEL_FILE = "resultado_vivo_file_force.xlsx"

# ==================================================
# LOGGING
# ==================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("processamento.log"), logging.StreamHandler()],
)

# ==================================================
# CHECKPOINT
# ==================================================


def carregar_checkpoint():
    if os.path.exists(CHECKPOINT_FILE):
        with open(CHECKPOINT_FILE, "r") as f:
            return set(json.load(f).get("processed_ids", []))
    return set()


def salvar_checkpoint(processed_ids):
    with open(CHECKPOINT_FILE, "w") as f:
        json.dump({"processed_ids": list(processed_ids)}, f, indent=4)


# ==================================================
# EXCEL
# ==================================================


def carregar_resultados_existentes():

    if os.path.exists(EXCEL_FILE):
        return pd.read_excel(EXCEL_FILE)

    return pd.DataFrame(columns=["Id", "Nome do Arquivo", "FileUrl", "Vivo_File_Force"])


# ==================================================
# MONGO
# ==================================================

client = MongoClient(MONGO_URI)

db = client[DATABASE]
collection = db[COLLECTION]

query = {"name": {"$regex": r"\.html"}, "subscription": "6495aca06e4f0f95368f289c"}

# ==================================================
# PROCESSAMENTO
# ==================================================

processed_ids = carregar_checkpoint()

logging.info(f"Checkpoint carregado com {len(processed_ids)} registros.")

df_resultado = carregar_resultados_existentes()

cursor = collection.find(query)

processados_nesta_execucao = 0

for doc in cursor:

    if processados_nesta_execucao >= LIMIT:
        break

    doc_id = str(doc["_id"])

    # pula já processados
    if doc_id in processed_ids:
        continue

    nome_arquivo = doc.get("name", "")
    file_url = doc.get("fileUrl", "")

    documento_texto = json.dumps(doc, default=str)

    possui_vivo_force = "vivo.file.force" in documento_texto

    nova_linha = {
        "Id": doc_id,
        "Nome do Arquivo": nome_arquivo,
        "FileUrl": file_url,
        "Vivo_File_Force": ("Sim" if possui_vivo_force else "Não"),
    }

    df_resultado = pd.concat(
        [df_resultado, pd.DataFrame([nova_linha])], ignore_index=True
    )

    processed_ids.add(doc_id)

    salvar_checkpoint(processed_ids)

    processados_nesta_execucao += 1

    logging.info(
        f"[{processados_nesta_execucao}/{LIMIT}] " f"Processado: {nome_arquivo}"
    )

# ==================================================
# PERSISTE EXCEL
# ==================================================

df_resultado.to_excel(EXCEL_FILE, index=False)

logging.info(f"Planilha atualizada: {EXCEL_FILE}")

logging.info(f"Total processados nesta execução: " f"{processados_nesta_execucao}")
