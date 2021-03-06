
const demos = [
  {
    title: 'Bar Chart',
    link: './bar-chart.html'
  },
  {
    title: 'Change Matrix',
    link: './change-matrix.html'
  },
  {
    title: 'Horizon Graph',
    link: './horizon-graph.html'
  }
];

const ul = document.createElement('ul');

demos.forEach((demo) => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${demo.link}">${demo.title}</a>`;
  ul.append(li);
});

document.getElementById('app').append(ul);
