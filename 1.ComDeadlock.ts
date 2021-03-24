using System;
using System.Threading;

namespace filosofos
{
    public class Filosofo
    {
        public Filosofo(int id)
        {
            this.Id = id;
            this.thread = new Thread(new ThreadStart(this.Eat));
        }
        public int Id { get; set; }
        public Thread thread { get; set; }
        public char Status { get; set; } = 'P';
        public bool IsEating => Status == 'E';
        public void Start()
        {
            thread.Start();
        }
        public void Stop()
        {
            DevolverHashi();
            thread.Interrupt();
        }
        public void PegarHasi()
        {
            HashiCount += 1;
            Program.totalHashis -= 1;
        }
        public void DevolverHashi()
        {
            HashiCount -= 1;
            Program.totalHashis += 1;
        }

        public int HashiCount { get; set; } = 1;

        public void Wait(Filosofo b)
        {
            Console.Write($" {this} Let's wait.... ");
            if (b == null) return;
            lock (b)
            {
                while (b.IsEating) ;
                return;
            }
        }

        private void Eat()
        {
            if (HashiCount < 2 && Program.totalHashis < 2) return;
            Status = 'E';
            Program.filosofosComendo += 1;
            Program.filosofosPensando -= 1;
            Thread.Sleep(10 / HashiCount);
            Status = 'P';
            Program.filosofosPensando += 1;
            Program.filosofosComendo -= 1;
            Stop();
            thread = new Thread(new ThreadStart(Eat));
        }

        public override string ToString()
        {
            return $"[{typeof(Filosofo)} {Id}] {Status}";
        }
    }
}

using System;
using System.Collections.Generic;

namespace filosofos
{
    class Program
    {
        public const int totalFilosofos = 5;
        public static int totalHashis = 5;
        public static int filosofosPensando = 0;
        public static int filosofosComendo = 0;
        public static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            List<Filosofo> filosofos = new List<Filosofo>();
            for (int i = 0; i < Program.totalFilosofos; i++)
            {
                filosofos.Add(new Filosofo(i));
            }
            int ciclos = 1;
            List<decimal> percentile = new List<decimal>();
            while (true)
            {
                try
                {
                    Filosofo lastToEat = null;
                    foreach (var filosofo in filosofos)
                    {
                        if (Program.totalHashis > 1 && Program.filosofosComendo < 2)
                        {
                            filosofo.PegarHasi();
                            lastToEat = filosofo;
                            filosofo.Start();
                            continue;
                        }
                        if (filosofo.Status == 'P')
                        {
                            filosofo.Wait(lastToEat);
                            filosofosPensando += 1;
                        }
                        Console.Write($"{filosofo} ");
                    }
                    Console.WriteLine();
                    percentile.Add( Program.filosofosPensando / Program.filosofosComendo );
                    if (Program.filosofosPensando == totalFilosofos) break;
                    ciclos += 1;
                    filosofosPensando = 0;
                }
                catch{
                    break;
                }
            }
            for (int i = 0; i < percentile.Count; i++)
            {
                Console.WriteLine($"ciclo: {i + 1} || percentile tpensando/tcomendo: {percentile[i]} ");
            }
        }
    }
}
