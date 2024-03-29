import ServicoFiltro from '~/servicos/Componentes/ServicoFiltro';
import tipoEscolaDTO from '~/dtos/tipoEscolaDto';
import { TOKEN_EXPIRADO } from '~/constantes';

class FiltroHelper {
  obterAnosLetivos = async ({ consideraHistorico, anoMinimo }) => {
    const anosLetivosLista = [];

    return ServicoFiltro.listarAnosLetivos({
      consideraHistorico,
      anoMinimo: anoMinimo !== undefined ? anoMinimo : 0,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(ano => {
            anosLetivosLista.push({ desc: ano, valor: ano });
          });
        }

        return anosLetivosLista;
      })
      .catch(() => anosLetivosLista);
  };

  obterModalidades = async ({ consideraHistorico, anoLetivoSelecionado }) => {
    const modalidadesLista = [];

    if (!anoLetivoSelecionado) {
      return null;
    }

    return ServicoFiltro.listarModalidades({
      consideraHistorico,
      anoLetivoSelecionado,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(modalidade => {
            modalidadesLista.push({
              desc: modalidade.descricao,
              valor: modalidade.id,
            });
          });
        }

        return modalidadesLista;
      })
      .catch(() => modalidadesLista);
  };

  obterPeriodos = async ({
    consideraHistorico,
    modalidadeSelecionada,
    anoLetivoSelecionado,
  }) => {
    const periodos = [];

    if (!anoLetivoSelecionado || typeof anoLetivoSelecionado === 'undefined')
      return null;

    return ServicoFiltro.listarPeriodos({
      consideraHistorico,
      modalidadeSelecionada,
      anoLetivoSelecionado,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(periodo => {
            periodos.push({ desc: periodo, valor: periodo });
          });
        }

        return periodos;
      })
      .catch(() => {
        return periodos;
      });
  };

  obterDres = async ({
    consideraHistorico,
    modalidadeSelecionada,
    periodoSelecionado,
    anoLetivoSelecionado,
  }) => {
    const dres = [];

    if (!anoLetivoSelecionado || typeof anoLetivoSelecionado === 'undefined')
      return null;

    return ServicoFiltro.listarDres({
      consideraHistorico,
      modalidadeSelecionada,
      periodoSelecionado,
      anoLetivoSelecionado,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(dre => {
            dres.push({
              desc: dre.nome,
              valor: dre.codigo,
              abrev: dre.abreviacao,
              id: dre.id,
            });
          });
        }
        return dres.sort(this.ordenarLista('desc'));
      })
      .catch(() => dres);
  };

  obterUnidadesEscolares = async ({
    consideraHistorico,
    modalidadeSelecionada,
    dreSelecionada,
    periodoSelecionado,
    anoLetivoSelecionado,
  }) => {
    const unidadesEscolares = [];

    if (!anoLetivoSelecionado || typeof anoLetivoSelecionado === 'undefined')
      return null;

    return ServicoFiltro.listarUnidadesEscolares({
      consideraHistorico,
      modalidadeSelecionada,
      dreSelecionada,
      periodoSelecionado,
      anoLetivoSelecionado,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(unidade => {
            unidadesEscolares.push({
              desc: unidade.nome,
              valor: unidade.codigo,
              id: unidade.id,
            });
          });
        }
        return unidadesEscolares;
      })
      .catch(() => unidadesEscolares);
  };

  obterTurmas = async ({
    consideraHistorico,
    modalidadeSelecionada,
    unidadeEscolarSelecionada,
    periodoSelecionado,
    anoLetivoSelecionado,
  }) => {
    const turmas = [];

    if (!anoLetivoSelecionado || typeof anoLetivoSelecionado === 'undefined')
      return null;

    return ServicoFiltro.listarTurmas({
      consideraHistorico,
      modalidadeSelecionada,
      unidadeEscolarSelecionada,
      periodoSelecionado,
      anoLetivoSelecionado,
    })
      .then(resposta => {
        if (resposta.data) {
          resposta.data.forEach(turma => {
            turmas.push({
              id: turma.id,
              desc: turma.nome,
              valor: turma.codigo,
              ano: turma.ano,
              ensinoEspecial: turma.ensinoEspecial,
            });
          });
        }
        return turmas.sort(this.ordenarLista('desc'));
      })
      .catch(e => {
        if (e?.message.indexOf(TOKEN_EXPIRADO) >= 0) return e;
        return turmas;
      });
  };

  ordenarLista = indice => {
    return function innerSort(a, b) {
      // eslint-disable-next-line no-prototype-builtins
      if (!a.hasOwnProperty(indice) || !b.hasOwnProperty(indice)) return 0;

      const itemA =
        typeof a[indice] === 'string' ? a[indice].toUpperCase() : a[indice];
      const itemB =
        typeof b[indice] === 'string' ? b[indice].toUpperCase() : b[indice];

      let ordem = 0;
      if (itemA > itemB) {
        ordem = 1;
      } else if (itemA < itemB) {
        ordem = -1;
      }
      return ordem;
    };
  };
}

export default new FiltroHelper();
