import { render, screen } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";
import App from "./App";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer();

test("if Luke Skywalker name renders", async () => {
  server.use(
    http.get("https://swapi.dev/api/people/1", () => {
      return HttpResponse.json({
        name: "Luke Skywalker",
      });
    })
  );
  render(<App />);

  const text = await screen.findByText("Luke Skywalker");
  expect(text).toBeInTheDocument();
});

test("display 500 status error message", async () => {
  server.use(
    http.get("https://swapi.dev/api/people/1", () => {
      return new HttpResponse(null, {
        status: 500,
      });
    })
  );
  render(<App />);
  const text = await screen.findByText(
    "Oops... something went wrong, try again 🤕"
  );
  expect(text).toBeInTheDocument();
});

test("display 418 status error message ", async () => {
  server.use(
    http.get("https://swapi.dev/api/people/1", () => {
      return new HttpResponse(null, {
        status: 418,
      });
    })
  );
  render(<App />);
  const text = await screen.findByText("I'm a tea pot 🫖, silly");
  expect(text).toBeInTheDocument();
});
