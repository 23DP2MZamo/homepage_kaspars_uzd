import './Cards.css';

export default function Cards() {
  const features = [
    {
      title: 'Organizējiet uzdevumus',
      description: 'Izveidojiet kategorijas un organizējiet savus uzdevumus pēc prioritātēm un nozīmes.'
    },
    {
      title: 'Sekojiet progresam',
      description: 'Atzīmējiet pabeigtos uzdevumus un skatiet savu progresu reāllaikā.'
    },
    {
      title: 'Personificējiet',
      description: 'Izvēlieties krāsas un kategorijas, kas jums patīk, lai padarītu darbu piejūtīgu.'
    },
    {
      title: 'Drošība',
      description: 'Jūsu dati ir droši un aizsargāti. Tikai jūs varat redzēt savus uzdevumus.'
    },
    {
      title: 'Pieejams visur',
      description: 'Strādājiet no jebkuras ierīces - datora, planšetes vai viedtālruņa.'
    },
    {
      title: 'Ātri un vienkārši',
      description: 'Intuitīvs interfeiss, kas ļauj ātri pievienot un pārvaldīt uzdevumus.'
    }
  ];

  return (
    <section className="cards-section" id="features">
      <div className="cards-container">
        <h2 className="cards-title">Kāpēc izvēlēties mūsu aplikāciju?</h2>
        <div className="cards-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
