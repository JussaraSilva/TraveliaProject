import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';


type UseDownloadReceiptProps = {
  pacoteFinal: any;
};

function formatPrice(
  value: number,
  currency = 'BRL',
  locale = 'pt-BR'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}


export function useDownloadReceipt({ pacoteFinal }: UseDownloadReceiptProps) {
  async function handleDownloadReceipt() {
    if (!pacoteFinal) return;

    const totalPaidFormatted =
      typeof pacoteFinal.preco.total === 'number'
    ? formatPrice(
        pacoteFinal.preco.total,
        pacoteFinal.preco.moeda,
      )
    : pacoteFinal.preco.total;

    const totalDiscountFormatted =
      typeof pacoteFinal.desconto.valorDesconto === 'number'
    ? formatPrice(
        pacoteFinal.desconto.valorDesconto,
        pacoteFinal.preco.moeda,
      )
    : pacoteFinal.desconto.valorDesconto;

    try {
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 32px;
                color: #111;
              }
              h1 {
                text-align: center;
                color: #1E6EF7;
              }
              h2 {
                margin-top: 32px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 8px;
              }
              .section {
                margin-top: 16px;
              }
              .row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
              }
              .label {
                font-weight: bold;
              }
              .box {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 12px;
                margin-top: 12px;
              }
            </style>
          </head>

          <body>
            <h1>Travel Receipt</h1>

            <div class="section">
              <div class="row">
                <span class="label">Package:</span>
                <span>${pacoteFinal.nome_pacote}</span>
              </div>
              <div class="row">
                <span class="label">Destination:</span>
                <span>${pacoteFinal.destino.nome}, ${pacoteFinal.destino.pais}</span>
              </div>
              <div class="row">
                <span class="label">Data do Agendamento:</span>
                <span>${new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <h2>Travel Details</h2>
            <div class="box">
              <div class="row">
                <span class="label">Passengers:</span>
                <span>${pacoteFinal.viajantes.quantidade}</span>
              </div>
              <div class="row">
                <span class="label">Check-in:</span>
                <span>${pacoteFinal.estadia.checkin}</span>
              </div>
              <div class="row">
                <span class="label">Check-out:</span>
                <span>${pacoteFinal.estadia.checkout}</span>
              </div>
              <div class="row">
                <span class="label">Nights:</span>
                <span>${pacoteFinal.estadia.noites}</span>
              </div>
            </div>

            <h2>Flights</h2>
            <div class="box">
              <div class="row">
                <span class="label">Airline:</span>
                <span>${pacoteFinal.voos.companhia_aerea.nome}</span>
              </div>
              <div class="row">
                <span class="label">Outbound:</span>
                <span>${pacoteFinal.voos.ida.numero} - ${pacoteFinal.voos.ida.aeroporto_origem} → ${pacoteFinal.voos.ida.aeroporto_destino}</span>
              </div>
              <div class="row">
                <span class="label">Return:</span>
                <span>${pacoteFinal.voos.volta.numero} - ${pacoteFinal.voos.volta.aeroporto_origem} → ${pacoteFinal.voos.volta.aeroporto_destino}</span>
              </div>
            </div>

            <h2>Payment</h2>
            <div class="box">
              <div class="row">
                <span class="label">Method:</span>
                <span>${pacoteFinal.pagamento?.title ?? 'N/A'}</span>
              </div>
              <div class="row">
                <span class="label">Discount:</span>
                <span>${pacoteFinal.desconto?.title ?? 'N/A'}</span>
              </div>
              <div class="row">
                <span class="label">Total Desconto:</span>
                <span>${totalDiscountFormatted}</span>
              </div>
              <div class="row">
                <span class="label">Total Paid:</span>
                <span>${totalPaidFormatted}</span>
              </div>
            </div>

          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (Platform.OS === 'ios' || (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Success', `Receipt generated at: ${uri}`);
      }
    } catch {
      Alert.alert('Error', 'Could not generate receipt.');
    }
  }

  return { handleDownloadReceipt };
}
