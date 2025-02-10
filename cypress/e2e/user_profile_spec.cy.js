describe("UserProfile Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://mood-boost-fe.onrender.com", (req) => {
      req.reply({
        statusCode: 200,
        body: { activities: [] },
      });
    });
    sessionStorage.setItem("userId", "19");
    cy.visit("https://mood-boost-fe.onrender.com/user"); 
  });

  it("displays loading message while fetching data", () => {
    cy.intercept("GET", "https://mood-boost-be.onrender.com/api/v1/users/19/activities", {
      delay: 1000,
      statusCode: 200,
      body: { activities: [] },
    }).as("fetchActivities");

    cy.visit("https://mood-boost-fe.onrender.com/user");
    cy.contains("Loading...").should("be.visible");
    cy.wait("@fetchActivities");
  });

  it("displays activities when data is fetched successfully", () => {
    const mockActivities = [
      { id: 1, name: "Activity 1", created_at: "2023-01-01T00:00:00Z" },
      { id: 2, name: "Activity 2", created_at: "2023-01-02T00:00:00Z" },
    ];

    cy.intercept("GET", "https://mood-boost-be.onrender.com/api/v1/users/19/activities", {
      statusCode: 200,
      body: { activities: mockActivities },
    }).as("fetchActivities");

    cy.visit("https://mood-boost-fe.onrender.com/user");
    cy.wait("@fetchActivities");
    cy.contains("Activity History:").should("be.visible");
    cy.contains("Activity 1").should("be.visible");
    cy.contains("Activity 2").should("be.visible");
  });

  it("displays error message when API call fails", () => {
    cy.intercept("GET", "https://mood-boost-be.onrender.com/api/v1/users/19/activities", {
      statusCode: 500,
      body: {},
    }).as("fetchActivities");

    cy.visit("https://mood-boost-fe.onrender.com/user");
    cy.wait("@fetchActivities");
    cy.contains("No activities found for this user.").should("be.visible");
  });

  it("displays a message when no activities are found", () => {
    cy.intercept("GET", "https://mood-boost-be.onrender.com/api/v1/users/19/activities", {
      statusCode: 200,
      body: { activities: [] },
    }).as("fetchActivities");

    cy.visit("https://mood-boost-fe.onrender.com/user");
    cy.wait("@fetchActivities");
    cy.contains("No activities found for this user.").should("be.visible");
  });
});
