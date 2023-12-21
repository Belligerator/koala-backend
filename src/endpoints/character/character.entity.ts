import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NemesisEntity } from '../nemesis/nemesis.entity';

@Entity('character')
export class CharacterEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ nullable: true })
    public gender?: string;
    
    @Column()
    public ability: string;

    @Column('numeric', { name: 'minimal_distance' })
    public minimalDistance: number;

    @Column('numeric', { nullable: true })
    public weight?: number;

    @Column('timestamp')
    public born: Date;
  
    @Column('timestamp', { nullable: true, name: 'in_space_since' })
    public inSpaceSince?: Date;

    @Column('integer', { name: 'beer_consumption' })
    public beerConsumption: number;

    @Column({ name: 'knows_the_answer' })
    public knowsTheAnswer: boolean;

    @OneToMany(() => NemesisEntity, (item) => item.character)
    public nemesisList?: NemesisEntity[];
}
