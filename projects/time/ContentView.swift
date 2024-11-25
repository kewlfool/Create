//
//  ContentView.swift
//  timeSlut
//
//  Created by Manbir Sawhney on 2023-08-06.
//



import SwiftUI
import AVFoundation

struct ContentView: View {
    @State private var rM1 = 0
    @State private var rM2 = 0
    @State private var rH = 0
    @State private var rS = 0
    @State private var cM = 0
    @State private var cH = 0
    @State private var cS = 0
    @State private var synth = AVSpeechSynthesizer()
    
    func setRandom() {
        rM1 = cM + 1
        rM2 = rM1 + 1
    }
    
    func announceTime(hours: Int, minutes: Int) {
        let utterance = AVSpeechUtterance(string: "It's \(hours) \(minutes).")
        utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
        synth.speak(utterance)
    }
    
    var body: some View {
        VStack {
            Text("Current Time:")
                .font(.headline)
            Text("\(cH) : \(cM) : \(cS)")
                .font(.title)
            
            Text("First Random Minute:")
                .font(.headline)
            Text("\(rM1)")
            
            Text("Second Random Minute:")
                .font(.headline)
            Text("\(rM2)")
            
            if (cM == rM1 || cM == rM2){
                Text("Random Time Announcement:")
                    .font(.headline)
                Text("\(cH) : \(cM) : \(cS)")
                
                
                
//
//                if (cM == rM1 || cM == rM2) && cS == rS {
//                    Text("Random Time Announcement:")
//                        .font(.headline)
//                    Text("\(cH) : \(cM) : \(cS)")
//
                
//                Button(action: {
//                    announceTime(hours: cH, minutes: cM)
//                }) {
//                    Text("Announce Time")
//                }
            }
        }
        .onAppear {
            let currentDate = Date()
            let calendar = Calendar.current
            cH = calendar.component(.hour, from: currentDate)
            cM = calendar.component(.minute, from: currentDate)
            cS = calendar.component(.second, from: currentDate)
            
            setRandom()
            rS = 0
        }
        .onReceive(Timer.publish(every: 1, on: .main, in: .common).autoconnect()) { _ in
            let currentDate = Date()
            let calendar = Calendar.current
            cH = calendar.component(.hour, from: currentDate)
            cM = calendar.component(.minute, from: currentDate)
            cS = calendar.component(.second, from: currentDate)
            
            if cM == 0 && cS == 0 {
                setRandom()
            }
        }
    }
}



struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
