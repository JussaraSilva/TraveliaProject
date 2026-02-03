import React from 'react';
import { View } from 'react-native';
import FlightDepartReturn from './flightDepartReturn';

interface FlightSectionProps {
  voos: any; // Melhore o tipo depois com sua Interface de voos
  styles?: any;
}

export const FlightSection = ({ voos, styles }: FlightSectionProps) => {
  return (
    <View style={styles?.containerIncludeFlight}>
      <FlightDepartReturn
        include="Flight"
        direction="Departure"
        dateBoarding={voos.ida.data_completa}
        airport_origin={voos.ida.aeroporto_origem}
        hour_boarding={voos.ida.horario_partida}
        airport_destination={voos.ida.aeroporto_destino}
        hour_destination={voos.ida.horario_chegada}
        numero_voo={voos.ida.numero}
        escala={voos.ida.escala}
        name_airline={voos.companhia_aerea.nome}
        logo_airline={voos.companhia_aerea.logo}
      />
      <FlightDepartReturn
        includeStyle={styles?.flightReturn}
        direction="Return"
        dateBoarding={voos.volta.data_completa}
        airport_origin={voos.ida.aeroporto_destino}
        hour_boarding={voos.volta.horario_partida}
        airport_destination={voos.ida.aeroporto_origem}
        hour_destination={voos.volta.horario_chegada}
        numero_voo={voos.volta.numero}
        escala={voos.voos?.ida?.escala} // Cuidado com o path aqui
        name_airline={voos.companhia_aerea.nome}
        logo_airline={voos.companhia_aerea.logo}
      />
    </View>
  );
};