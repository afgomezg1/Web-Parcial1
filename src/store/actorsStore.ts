"use client";

import { create } from "zustand";

const API_URL = "http://localhost:3000/api/v1/actors";

export type Movie = {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
};

export type Actor = {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies: Movie[];
};

type ActorInput = {
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
};

type ActorsStore = {
  actors: Actor[];
  loading: boolean;
  error: string;
  hasFetched: boolean;
  fetchActors: () => Promise<void>;
  createActor: (newActor: ActorInput) => Promise<boolean>;
  updateActor: (id: string, updatedActor: ActorInput) => Promise<boolean>;
  deleteActor: (id: string) => Promise<boolean>;
  clearError: () => void;
};

export const useActorsStore = create<ActorsStore>((set) => ({
  actors: [],
  loading: false,
  error: "",
  hasFetched: false,

  fetchActors: async () => {
    try {
      set({ loading: true, error: "" });

      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Could not fetch actors");
      }

      const data = await response.json();

      set({
        actors: Array.isArray(data) ? data : [],
        loading: false,
        error: "",
        hasFetched: true,
      });
    } catch {
      set({
        loading: false,
        error: "Error loading actors",
      });
    }
  },

  createActor: async (newActor) => {
    try {
      set({ loading: true, error: "" });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActor),
      });

      if (!response.ok) {
        throw new Error("Could not create the actor");
      }

      const createdActor = await response.json();

      set((state) => ({
        actors: createdActor?.id ? [createdActor, ...state.actors] : state.actors,
        loading: false,
        error: "",
        hasFetched: true,
      }));

      return true;
    } catch {
      set({
        loading: false,
        error: "Error creating the actor",
      });
      return false;
    }
  },

  updateActor: async (id, updatedActor) => {
    try {
      set({ loading: true, error: "" });

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedActor),
      });

      if (!response.ok) {
        throw new Error("Could not update the actor");
      }

      const savedActor = await response.json();

      set((state) => ({
        actors: state.actors.map((actor) =>
          actor.id === id ? savedActor : actor
        ),
        loading: false,
        error: "",
      }));

      return true;
    } catch {
      set({
        loading: false,
        error: "Error updating the actor",
      });
      return false;
    }
  },

  deleteActor: async (id) => {
    try {
      set({ loading: true, error: "" });

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete the actor");
      }

      set((state) => ({
        actors: state.actors.filter((actor) => actor.id !== id),
        loading: false,
        error: "",
      }));

      return true;
    } catch {
      set({
        loading: false,
        error: "Error deleting the actor",
      });
      return false;
    }
  },

  clearError: () => set({ error: "" }),
}));