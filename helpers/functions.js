export async function sendBriefDescriptionData(details) {
  const response = await fetch("api/description", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}

export async function sendAboutData(details) {
  const response = await fetch("api/about", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}

export async function sendServicesData(details) {
  const response = await fetch("api/service", {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}

export async function deleteDescription(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/description", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}

export async function deleteAbout(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/about", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}

export async function deleteService(idreceived) {
  const body = { id: idreceived };
  const response = await fetch("api/service", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong!!");
  }

  return data;
}
