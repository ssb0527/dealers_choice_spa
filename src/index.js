import axios from 'axios';

const brandsList = document.querySelector('#brand-list');
const takeawaysList = document.querySelector('#takeaway-list');

window.addEventListener('hashchange', async() => {
    const brandId = window.location.hash.slice(1);
    const url = `api/brands/${brandId}/takeaways`;
    const takeaways = (await axios(url)).data;
    renderTakeaways(takeaways);
    renderBrands();
});

const state = {};

const renderBrands = () => {
    const brandId = window.location.hash.slice(1)*1;
    const html = state.brands.map(brand => `
    <li class='${brand.id === brandId ? 'selected': ''}'>
        <a href='#${brand.id}'>
            ${brand.name}
        </a>
    </li>
    `).join('');
    brandsList.innerHTML = html;
}

const renderTakeaways = (takeaways) => {
    const html = takeaways.map(takeaway => `
    <li>
        ${takeaway.comment}

    </li>
    `).join('');
    takeawaysList.innerHTML = html;
}

const fetchBrands = async() => {
    const response = await axios.get('/api/brands');
    state.brands= response.data;
};

// const fetchTakeaways = async() => {
//     const brandId = window.location.hash.slice(1);
//     const response = await axios.get(`api/brands/${brandId}/takeaways`);
//     state.takeaways = response.data;
// };

const start = async() => {
    await fetchBrands();
    renderBrands();
}

start();