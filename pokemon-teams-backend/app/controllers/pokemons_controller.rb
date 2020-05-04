require 'faker'
class PokemonsController < ApplicationController

    def index
        @pokemons = Pokemon.all
        render json: @pokemons
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            trainer.pokemons << pokemon 
            render json: pokemon
        end
    end

    def destroy
        pokemon = Pokemon.all.find_by(id: params[:id])
        trainer = pokemon.trainer
        pokemon.destroy
        render json: trainer, include: [:pokemons]
    end

end
