export class Donador {
  constructor(
    public TipoDeSangre: string = '',
    public Alergias: string[] = [],
    public Enfermedades: string[] = [],
    public UltimaVacuna: string = '',
    public BeneficiarioIds: number[] = [],
    public PersonaId: number = 0,
    public id?: number
  ) {}
}
