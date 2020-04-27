import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Delivery,
  Information,
  Dates,
  SignatureImage,
} from './styles';

export default function Visualization({
  idDelivery,
  visible,
  handleCloseVisualization,
}) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function loadInfo() {
      if (visible) {
        const response = await api.get(
          `/deliverypacks/2/package/${idDelivery}`
        );

        setInfo(response.data);
      }
    }
    loadInfo();
  }, [idDelivery, visible]);

  const { rua, numero, bairro, cidade, estado, cep } = info.Recipient || {};

  return (
    visible && (
      <Container>
        <Delivery>
          <Information>
            <strong>Informações da encomenda</strong>
            <span>{`${rua}, ${numero}-${bairro}`}</span>
            <span>{`${cidade}-${estado}`}</span>
            <span>{cep}</span>
          </Information>

          <Dates>
            <span>Datas</span>

            {info.start_date || info.end_date || info.canceled_at ? (
              <table>
                <tbody>
                  {info.start.date && (
                    <tr>
                      <td>
                        <span>Retirada :</span>
                      </td>
                      <td>{info.start_date}</td>
                    </tr>
                  )}
                  {info.end_date && (
                    <tr>
                      <td>
                        <span>Entrega :</span>
                      </td>
                      <td>{info.end_date}</td>
                    </tr>
                  )}
                  {info.canceled_at && (
                    <tr>
                      <td>
                        <span>Cancelada:</span>
                      </td>
                      <td>{info.canceled_at}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <span>
                <br />
                <br />
              </span>
            )}
          </Dates>
          <SignatureImage>
            <strong>Assinatura do destinatário</strong>
            {info.signature ? (
              <img src={info.signature.url} alt="Assinatura do destinatário" />
            ) : (
              <span> </span>
            )}
          </SignatureImage>
          <button type="button" onClick={handleCloseVisualization}>
            Fechar
          </button>
        </Delivery>
      </Container>
    )
  );
}

Visualization.propTypes = {
  idDelivery: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCloseVisualization: PropTypes.func.isRequired,
};
