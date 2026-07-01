// Direct port of the eGFR calculator math authored by Ben Malin. Kept 1-for-1
// with the production formulae (2021 CKD-EPI for adults, CKiD U25 for
// children).

interface AdultInputs {
  isConv: boolean;
  isFemale: boolean;
  age: number;
  scr: number;
  scy: number;
}

interface ChildInputs extends AdultInputs {
  cm?: number;
  feet?: number;
  inch?: number;
}

export const gfrAdult = (inputs: AdultInputs): number => {
  const {
      // Conventional (mg/dL) or SI (µmol/L) units for serum creatinine input
      isConv,
      // Female or Male
      isFemale,
      age,
      // Serum creatinine input
      scr,
      // Serum cystatin C input (always mg/L)
      scy
    } = inputs,
    // Standardized serum creatinine in mg/dL
    // If SI units, convert µmol/L to mg/dL for Serum creatinine
    SCr = isConv ? scr : scr / 88.4,
    // Standardized serum cystatin C in mg/L
    Scys = scy,
    k = isFemale ? 0.7 : 0.9,
    // alpha value for serum creatinine
    aSCr = isFemale ? -0.241 : -0.302,
    // alpha value for serum creatinine and serum cystatin C
    aBoth = isFemale ? -0.219 : -0.144,
    // Indicates the minimum of SCr/κ or 1
    minSCr = Math.min(SCr / k, 1),
    // Indicates the maximum of SCr/κ or 1
    maxSCr = Math.max(SCr / k, 1),
    // Indicates the minimum of Scys/0.8 or 1
    minSCy = Math.min(Scys / 0.8, 1),
    // Indicates the maximum of Scys/0.8 or 1
    maxSCy = Math.max(Scys / 0.8, 1);

  if (typeof inputs !== 'object') {
    throw new Error('Calculator requires an object as an argument.');
  }

  // 2021 CKD-EPI creatinine equation
  if (scr && !scy) {
    return Math.round(
      142 *
        Math.pow(minSCr, aSCr) *
        Math.pow(maxSCr, -1.2) *
        Math.pow(0.9938, age) *
        (isFemale ? 1.012 : 1)
    );
  }
  // 2012 CKD-EPI cystatin C equation
  else if (!scr && scy) {
    return Math.round(
      133 *
        Math.pow(minSCy, -0.499) *
        Math.pow(maxSCy, -1.328) *
        Math.pow(0.996, age) *
        (isFemale ? 0.932 : 1)
    );
  }
  // 2021 CKD-EPI creatinine-cystatin C equation
  else if (scr && scy) {
    return Math.round(
      135 *
        Math.pow(minSCr, aBoth) *
        Math.pow(maxSCr, -0.544) *
        Math.pow(minSCy, -0.323) *
        Math.pow(maxSCy, -0.778) *
        Math.pow(0.9961, age) *
        (isFemale ? 0.963 : 1)
    );
  } else {
    throw new Error(
      'Calculator at minimum requires a value for either creatinine or cystatin C to produce a result.'
    );
  }
};

export const gfrChild = (inputs: ChildInputs): number => {
  const {
      isConv,
      isFemale,
      age,
      cm,
      feet,
      inch,
      scr,
      scy
    } = inputs,
    SCr = isConv ? scr : scr / 88.4,
    Scys = scy,
    ageSCr =
      age < 12 ? 'child' : age >= 12 && age < 18 ? 'teen' : 'adult',
    ageCys =
      age < 12
        ? 'child'
        : age >= 12 && age < 15
          ? 'preteen'
          : age >= 15 && age < 18
            ? 'teen'
            : 'adult',
    height = cm
      ? cm / 100
      : ((feet ?? 0) + (isNaN(inch ?? NaN) ? 0 : (inch ?? 0)) / 12) / 3.28084,
    // K in U25 Creatinine equation based on sex and age
    kSCr = {
      male: {
        child: 39 * Math.pow(1.008, age - 12),
        teen: 39 * Math.pow(1.045, age - 12),
        adult: 50.8
      },
      female: {
        child: 36.1 * Math.pow(1.008, age - 12),
        teen: 36.1 * Math.pow(1.023, age - 12),
        adult: 41.4
      }
    } as Record<'male' | 'female', Record<'child' | 'teen' | 'adult', number>>,
    // K in Cystatin C equation based on sex and age
    kCys = {
      male: {
        child: 87.2 * Math.pow(1.011, age - 15),
        preteen: 87.2 * Math.pow(1.011, age - 15),
        teen: 87.2 * Math.pow(0.96, age - 15),
        adult: 77.1
      },
      female: {
        child: 79.9 * Math.pow(1.004, age - 12),
        preteen: 79.9 * Math.pow(0.974, age - 12),
        teen: 79.9 * Math.pow(0.974, age - 12),
        adult: 68.3
      }
    } as Record<
      'male' | 'female',
      Record<'child' | 'preteen' | 'teen' | 'adult', number>
    >;

  if (typeof inputs !== 'object') {
    throw new Error('Calculator requires an object as an argument.');
  }

  // U25 Creatinine equation
  if (scr && !scy) {
    return Math.round(
      kSCr[isFemale ? 'female' : 'male'][ageSCr] * (height / SCr)
    );
  }
  // U25 Cystatin C equation
  else if (!scr && scy) {
    return Math.round(
      kCys[isFemale ? 'female' : 'male'][ageCys] * (1 / Scys)
    );
  }
  // Combined U25 Creatinine and U25 Cystatin C equations
  else if (scr && scy) {
    return Math.round(
      (kSCr[isFemale ? 'female' : 'male'][ageSCr] * (height / SCr) +
        kCys[isFemale ? 'female' : 'male'][ageCys] * (1 / Scys)) /
        2
    );
  } else {
    throw new Error(
      'Calculator at minimum requires values for either creatinine or cystatin C, age, and height to produce a result.'
    );
  }
};
