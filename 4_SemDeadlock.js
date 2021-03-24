const dbFake = { comendo: [], pensando: [] };

const talheres = 5;
const total = 5;

const janta = filo => {
  const comendo = dbFake.comendo || [];
  const pensando = dbFake.pensando || [];

  if (comendo.length < Math.floor(talheres / 2) && !comendo.includes(filo)) {
    if (pensando.includes(filo)) {
      const index = pensando.indexOf(filo);
      pensando.splice(index, 1);
      dbFake.pensando = pensando;
    }
    dbFake.comendo = comendo.concat(filo);
  } else if (pensando.length < Math.ceil(talheres / 2) && !pensando.includes(filo)) {
    if (comendo.includes(filo)) {
      const index = comendo.indexOf(filo);
      comendo.splice(index, 1);
      dbFake.comendo = comendo;
    }
    dbFake.pensando = pensando.concat(filo);
  } else {
    if (pensando.includes(filo)) {
      const index = pensando.indexOf(filo);
      pensando.splice(index, 1);
      dbFake.pensando = pensando;
    }
    if (comendo.includes(filo)) {
      const index = comendo.indexOf(filo);
      comendo.splice(index, 1);
      dbFake.comendo = comendo;
    }
  }
};
