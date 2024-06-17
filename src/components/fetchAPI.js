export async function getData(baseUser = '1') {
    const res = await fetch(`http://localhost:6967/users/${baseUser}`);
    return res.json();
  }