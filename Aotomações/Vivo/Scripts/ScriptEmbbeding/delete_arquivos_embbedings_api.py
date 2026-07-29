import pandas as pd
import requests

# Configuração
API_URL = "https://sua-api.com/arquivos"
TOKEN = "SEU_TOKEN_AQUI"


def deletar_arquivo(file_id):
    try:
        url = f"{API_URL}/{file_id}"

        response = requests.delete(
            url,
            headers={
                "Authorization": f"Bearer {TOKEN}",
                "Content-Type": "application/json",
            },
            timeout=10,
        )

        # você pode tratar 404 como sucesso se quiser
        if response.status_code in [200, 204]:
            return True, response.status_code
        elif response.status_code == 404:
            return False, response.status_code
        else:
            return False, response.status_code

    except requests.exceptions.RequestException as e:
        return False, str(e)


def processar_planilha(arquivo_entrada, arquivo_saida):
    df = pd.read_csv(arquivo_entrada)

    # criar colunas novas
    df["apagado"] = ""
    df["status_http"] = ""

    for index, row in df.iterrows():
        file_id = row["id"]

        print(f"🔄 Deletando ID: {file_id}")

        sucesso, status = deletar_arquivo(file_id)

        df.at[index, "apagado"] = "sim" if sucesso else "não"
        df.at[index, "status_http"] = status

    # salvar resultado
    df.to_csv(arquivo_saida, index=False)
    print("✅ Processamento concluído!")


if __name__ == "__main__":
    processar_planilha("entrada.csv", "saida.csv")
