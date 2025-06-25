document.addEventListener('DOMContentLoaded', () => {
  const modeSelect = document.getElementById('mode-select');
  const namesInputSection = document.getElementById('names-inputs');
  const numbersInputSection = document.getElementById('numbers-inputs');
  const drawButton = document.getElementById('draw-teams');
  const teamsContainer = document.getElementById('teams');

  modeSelect.addEventListener('change', () => {
    const mode = modeSelect.value;
    if (mode === 'names') {
      namesInputSection.style.display = 'block';
      numbersInputSection.style.display = 'none';
    } else {
      namesInputSection.style.display = 'none';
      numbersInputSection.style.display = 'block';
    }
    teamsContainer.innerHTML = '';
  });

  drawButton.addEventListener('click', () => {
    const mode = modeSelect.value;
    const teamSize = parseInt(document.getElementById('team-size').value);

    if (!teamSize || teamSize <= 0) {
      alert('Informe um valor válido para jogadores por time.');
      return;
    }

    let players = [];

    if (mode === 'names') {
      const rawNames = document.getElementById('names').value.trim();
      players = rawNames
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
    } else {
      const totalNumbers = parseInt(document.getElementById('total-numbers').value);
      if (!totalNumbers || totalNumbers <= 0) {
        alert('Informe um número total válido de jogadores.');
        return;
      }

      players = Array.from({ length: totalNumbers }, (_, i) => (i + 1).toString());
    }

    if (players.length < teamSize) {
      alert('Quantidade de jogadores menor que o tamanho do time.');
      return;
    }

    // Embaralha os jogadores
    const shuffled = players.sort(() => 0.5 - Math.random());

    const teams = [];
    for (let i = 0; i < shuffled.length; i += teamSize) {
      teams.push(shuffled.slice(i, i + teamSize));
    }

    // Exibir os times
    teamsContainer.innerHTML = '';
    teams.forEach((team, index) => {
      const div = document.createElement('div');
      div.classList.add('team');
      div.innerHTML = `<h3>Time ${index + 1}</h3><ul>${team.map(p => `<li>${p}</li>`).join('')}</ul>`;
      teamsContainer.appendChild(div);
    });
  });
});
